import Avatar from "components/Avatar";
import { useAppDispatch, useAppSelector } from "hooks";
import { logout } from "modules/authentication/screens/store/AuthenticationReducer";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";


export const DashboardLayout: React.FC = () => {
  const user = useAppSelector((state) => state.authentication.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  //TODO make this static value
  const handleLogout = () => {
    dispatch(logout());
    navigate('/')
  }
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
  
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="w-full flex-shrink-0 bg-white border-b border-gray-200">
          <div className="px-4 py-2 flex justify-between items-center">
            <button onClick={() => window.history.back()}>{'< Back'}</button>
            <h2>{user.username}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
