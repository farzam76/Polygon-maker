import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import { logout } from "modules/authentication/screens/store/AuthenticationReducer";
import { appRoutes } from "routes";

export const DashboardLayout: React.FC = () => {
  const user = useAppSelector((state) => state.authentication.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate(appRoutes.LOGIN_ROUTE);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="w-full flex-shrink-0 bg-white border-b border-gray-200">
          <div className="px-4 py-2 flex justify-between items-center">
            <button onClick={() => window.history.back()}>{"< Back"}</button>
            <h2>{user.username}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
