import Link from 'next/link';
import { cn } from '@/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn('h-7 w-7', className)}>
      <rect width="32" height="32" rx="9" fill="rgb(var(--brand))" />
      <path
        d="M9 22V11.5c0-.6.73-.9 1.15-.47L16 17l5.85-5.97c.42-.43 1.15-.13 1.15.47V22"
        fill="none"
        stroke="rgb(var(--brand-ink))"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ href = '/', className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn('focus-ring flex items-center gap-2 rounded-lg', className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight">
        mcpfy<span className="text-faint">.ai</span>
      </span>
    </Link>
  );
}
