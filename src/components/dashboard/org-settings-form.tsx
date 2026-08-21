"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { OrgAvatar } from "./org-switcher";
import { Field, fieldClass } from "./ui";
import type { Organization } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

/**
 * Local-only edit form. The save button reveals itself once something differs
 * from the stored organization, so a read-only visit stays quiet.
 */
export function OrgSettingsForm({ organization }: { organization: Organization }) {
  const [name, setName] = useState(organization.name);
  const [description, setDescription] = useState(organization.description);

  const dirty =
    name.trim() !== organization.name ||
    description.trim() !== organization.description;

  return (
    <form
      className="rounded-xl border p-7"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="space-y-6">
        <div>
          <span className="text-[14px] font-medium">Logo</span>
          <div className="mt-3 flex items-center gap-4">
            <OrgAvatar slug={organization.slug} className="size-11" />
            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors hover:bg-accent"
            >
              <Upload className="size-4" />
              Upload image
            </button>
          </div>
        </div>

        <Field label="Name" required>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={fieldClass}
          />
        </Field>

        <Field label="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="What is this organization for?"
            className={cn(fieldClass, "h-auto resize-y py-2.5")}
          />
        </Field>
      </div>

      {dirty && (
        <div className="mt-7 flex items-center gap-3 border-t pt-6">
          <button
            type="submit"
            className="inline-flex h-10 items-center rounded-full bg-foreground px-4 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Save changes
          </button>
          <button
            type="button"
            onClick={() => {
              setName(organization.name);
              setDescription(organization.description);
            }}
            className="inline-flex h-10 items-center rounded-full border px-4 text-[14px] font-medium transition-colors hover:bg-accent"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
