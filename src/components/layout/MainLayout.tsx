import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

// 1. Tell TypeScript that MainLayout must receive an onLogout function
interface MainLayoutProps {
  onLogout: () => void;
}

// 2. Destructure 'onLogout' inside the function arguments
export default function MainLayout({ onLogout }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#f8f9ff]">
      {/* We pass the onLogout function down to the Sidebar */}
      <Sidebar onLogout={onLogout} />

      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <Navbar />

        <main className="p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}