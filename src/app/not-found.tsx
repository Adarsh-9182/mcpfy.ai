import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-25" aria-hidden="true" />
      <div className="relative">
        <Logo />
        <p className="mt-10 font-mono text-sm text-brand">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page isn&apos;t here</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back home</ButtonLink>
          <ButtonLink href="/docs" variant="secondary">Browse docs</ButtonLink>
        </div>
        <p className="mt-8 text-xs text-faint">
          Looking for the dashboard?{' '}
          <Link href="/dashboard" className="focus-ring rounded text-brand hover:underline">
            Open it here
          </Link>
        </p>
      </div>
    </div>
  );
}
