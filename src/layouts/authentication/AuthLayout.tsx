import {Header} from "components";
import LanguageSwitcher from "layouts/components/LanguageSwitcher";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const AuthLayout: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-600">
    <Header className="p-2 flex justify-end">
      <Suspense fallback={"...loading"}>
        <LanguageSwitcher />
      </Suspense>
    </Header>
    <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
      <Outlet />
    </main>
  </div>
);
