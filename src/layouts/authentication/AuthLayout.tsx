import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-600">
    <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
      <Outlet />
    </main>
  </div>
);
