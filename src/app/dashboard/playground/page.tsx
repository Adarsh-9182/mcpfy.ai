import { Playground } from '@/components/dashboard/Playground';
import { servers } from '@/lib/data';

export default function PlaygroundPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Inspector</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Call any deployed tool with real arguments and watch the protocol frames stream back.
      </p>
      <div className="mt-8">
        <Playground servers={servers} />
      </div>
    </>
  );
}
