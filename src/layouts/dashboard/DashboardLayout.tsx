import React from "react";
import { Outlet } from "react-router-dom";

export const DashboardLayout: React.FC = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <nav className="hidden w-64 bg-white border-r border-gray-200 md:flex md:flex-shrink-0">
        <div className="w-64 py-4">{/* Sidebar content goes here */}</div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="w-full flex-shrink-0 bg-white border-b border-gray-200">
          <div className="px-4 py-2">{/* Header content goes here */}</div>
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
