import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {Header,Avatar,Button} from "components";
import LanguageSwitcher from "layouts/components/LanguageSwitcher";
import { logout } from "modules/authentication/screens/store/AuthenticationReducer";
import { appRoutes } from "routes";
import { useAppDispatch, useAppSelector } from "hooks";


export const DashboardLayout: React.FC = () => {
  const user = useAppSelector((state) => state.authentication.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { t } = useTranslation();
  const handleLogout = () => {
    dispatch(logout());
    navigate(appRoutes.LOGIN_ROUTE);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header>
          <div className="px-4 py-2 flex justify-between items-center">
            {location !== appRoutes.PROJECT_ROUTE ? (
              <Button iconName="back" onClick={() => window.history.back()} />
            ) : (
              <Avatar size="small" />
            )}
            <h2>
              {t("general.header")} {user.username}
            </h2>
            <div>
              <button role="button" className="mr-2" onClick={handleLogout}>
                Logout
              </button>
              <LanguageSwitcher />
            </div>
          </div>
        </Header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
