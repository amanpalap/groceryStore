import { SidebarDemo } from "@/components/sideBar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-auto z-50 fixed">
        <SidebarDemo />
      </div>
      {children}
    </div>
  );
}