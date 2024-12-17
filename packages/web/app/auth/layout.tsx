export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col min-h-[calc(100dvh-72px)]">{children}</main>
  );
}
