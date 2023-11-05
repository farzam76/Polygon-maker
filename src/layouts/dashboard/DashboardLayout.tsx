import { Outlet } from "react-router-dom";

export const DashboardLayout: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
      <Outlet />
    </main>
  </div>
);
