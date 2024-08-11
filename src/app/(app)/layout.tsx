import { SidebarDemo } from "@/components/sideBar";
import StoreProvider from "@/components/storeProvider";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <StoreProvider>
      <div className="flex flex-col min-h-screen">
        <div className="w-auto z-50 fixed">
          <SidebarDemo />
        </div>
        <div className="lg:ml-16 md:ml-16">
          {children}
        </div>
      </div>
    </StoreProvider>
  );
}
