-- mcpfy Cloud schema.
--
-- Run this once in the Supabase SQL editor. It is written to be re-runnable:
-- every object is created only if it is missing, so re-running it is a no-op
-- rather than an error.
--
-- Everything is scoped to an organization, and every policy answers the same
-- question — is the caller a member of the organization that owns this row.

-- ---------------------------------------------------------------- enums ----

do $$ begin
  create type org_role as enum ('owner', 'admin', 'developer', 'viewer');
exception when duplicate_object then null; end $$;

do $$ begin
  create type server_status as enum ('ready', 'building', 'error', 'paused');
exception when duplicate_object then null; end $$;

do $$ begin
  create type server_runtime as enum ('typescript', 'python', 'docker');
exception when duplicate_object then null; end $$;

do $$ begin
  create type deployment_environment as enum ('production', 'preview');
exception when duplicate_object then null; end $$;

-- --------------------------------------------------------------- tables ----

create table if not exists public.organizations (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  slug             text not null unique,
  description      text not null default '',
  logo_url         text,
  plan             text not null default 'Free',
  credits_used     numeric(10, 2) not null default 0,
  credits_included numeric(10, 2) not null default 5,
  created_at       timestamptz not null default now()
);

create table if not exists public.organization_members (
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id         uuid not null references auth.users (id) on delete cascade,
  role            org_role not null default 'owner',
  created_at      timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table if not exists public.servers (
  id              uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  slug            text not null,
  name            text not null,
  description     text not null default '',
  status          server_status not null default 'building',
  runtime         server_runtime not null default 'typescript',
  repo            text,
  branch          text not null default 'main',
  url             text,
  region          text not null default 'iad1',
  created_at      timestamptz not null default now(),
  unique (organization_id, slug)
);

create table if not exists public.deployments (
  id          uuid primary key default gen_random_uuid(),
  server_id   uuid not null references public.servers (id) on delete cascade,
  sha         text not null,
  message     text not null default '',
  branch      text not null default 'main',
  environment deployment_environment not null default 'production',
  status      server_status not null default 'building',
  author      text not null default '',
  duration    text not null default '—',
  url         text,
  created_at  timestamptz not null default now()
);

create index if not exists servers_organization_id_idx on public.servers (organization_id);
create index if not exists deployments_server_id_idx on public.deployments (server_id, created_at desc);
create index if not exists organization_members_user_id_idx on public.organization_members (user_id);

-- ------------------------------------------------------------ membership ----

-- Security definer so the membership check itself is not subject to the
-- policies it is used by, which would recurse.
create or replace function public.is_org_member(org uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.organization_members m
    where m.organization_id = org
      and m.user_id = auth.uid()
  );
$$;

create or replace function public.owns_server(srv uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.servers s
    join public.organization_members m on m.organization_id = s.organization_id
    where s.id = srv
      and m.user_id = auth.uid()
  );
$$;

-- ------------------------------------------------------------------ RLS ----

alter table public.organizations        enable row level security;
alter table public.organization_members enable row level security;
alter table public.servers              enable row level security;
alter table public.deployments          enable row level security;

drop policy if exists organizations_read on public.organizations;
create policy organizations_read on public.organizations
  for select using (public.is_org_member(id));

drop policy if exists organizations_write on public.organizations;
create policy organizations_write on public.organizations
  for update using (public.is_org_member(id)) with check (public.is_org_member(id));

drop policy if exists members_read on public.organization_members;
create policy members_read on public.organization_members
  for select using (public.is_org_member(organization_id));

drop policy if exists servers_read on public.servers;
create policy servers_read on public.servers
  for select using (public.is_org_member(organization_id));

drop policy if exists servers_insert on public.servers;
create policy servers_insert on public.servers
  for insert with check (public.is_org_member(organization_id));

drop policy if exists servers_update on public.servers;
create policy servers_update on public.servers
  for update using (public.is_org_member(organization_id));

drop policy if exists servers_delete on public.servers;
create policy servers_delete on public.servers
  for delete using (public.is_org_member(organization_id));

drop policy if exists deployments_read on public.deployments;
create policy deployments_read on public.deployments
  for select using (public.owns_server(server_id));

drop policy if exists deployments_insert on public.deployments;
create policy deployments_insert on public.deployments
  for insert with check (public.owns_server(server_id));

-- ------------------------------------------------- organization on signup ----

-- A new account has nowhere to put anything, so give it one organization and
-- make the new user its owner. The slug is derived from the email local part
-- and de-duplicated with a counter.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_slug text;
  final_slug text;
  suffix int := 0;
  display_name text;
  new_org_id uuid;
begin
  display_name := coalesce(
    nullif(new.raw_user_meta_data ->> 'name', ''),
    nullif(new.raw_user_meta_data ->> 'user_name', ''),
    split_part(coalesce(new.email, 'workspace'), '@', 1)
  );

  base_slug := regexp_replace(lower(display_name), '[^a-z0-9]+', '-', 'g');
  base_slug := trim(both '-' from base_slug);
  if base_slug = '' then base_slug := 'workspace'; end if;

  final_slug := base_slug;
  while exists (select 1 from public.organizations o where o.slug = final_slug) loop
    suffix := suffix + 1;
    final_slug := base_slug || '-' || suffix;
  end loop;

  insert into public.organizations (name, slug)
  values (display_name, final_slug)
  returning id into new_org_id;

  insert into public.organization_members (organization_id, user_id, role)
  values (new_org_id, new.id, 'owner');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------- backfill already-signed-up users ----

-- The trigger only fires for new accounts, so anyone who signed in before this
-- migration ran still needs an organization.
do $$
declare
  u record;
begin
  for u in
    select id, email, raw_user_meta_data
    from auth.users
    where id not in (select user_id from public.organization_members)
  loop
    declare
      display_name text;
      base_slug text;
      final_slug text;
      suffix int := 0;
      new_org_id uuid;
    begin
      display_name := coalesce(
        nullif(u.raw_user_meta_data ->> 'name', ''),
        nullif(u.raw_user_meta_data ->> 'user_name', ''),
        split_part(coalesce(u.email, 'workspace'), '@', 1)
      );
      base_slug := trim(both '-' from regexp_replace(lower(display_name), '[^a-z0-9]+', '-', 'g'));
      if base_slug = '' then base_slug := 'workspace'; end if;
      final_slug := base_slug;
      while exists (select 1 from public.organizations o where o.slug = final_slug) loop
        suffix := suffix + 1;
        final_slug := base_slug || '-' || suffix;
      end loop;

      insert into public.organizations (name, slug)
      values (display_name, final_slug)
      returning id into new_org_id;

      insert into public.organization_members (organization_id, user_id, role)
      values (new_org_id, u.id, 'owner');
    end;
  end loop;
end $$;
