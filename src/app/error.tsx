'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled application error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Logo />
      <p className="mt-10 font-mono text-sm text-danger">Error</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Something broke on our side</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        The error has been logged. Retrying often clears it.
      </p>
      {error.digest && (
        <p className="mt-4 font-mono text-xs text-faint">digest: {error.digest}</p>
      )}
      <div className="mt-8">
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
