/** Chrome-free shell for the signed-in product surface. */
export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main id="main">{children}</main>;
}
