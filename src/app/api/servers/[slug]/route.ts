import { NextResponse } from 'next/server';
import { getServer } from '@/lib/data';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const server = getServer(slug);

  if (!server) {
    return NextResponse.json({ error: 'server_not_found', slug }, { status: 404 });
  }

  return NextResponse.json({ server });
}
