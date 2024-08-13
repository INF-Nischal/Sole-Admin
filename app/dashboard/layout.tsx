import Sidebar from "@/components/ui/nav/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen flex">
      <Sidebar />
      <div className="w-full p-8 overflow-y-auto">{children}</div>
    </main>
  );
}
