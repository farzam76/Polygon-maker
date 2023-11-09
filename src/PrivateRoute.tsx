import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "hooks";
import { appRoutes } from "routes";

export default function PrivateRoute({ element }: { element: JSX.Element }) {
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    element
  ) : (
    <Navigate to={appRoutes.LOGIN_ROUTE} state={{ from: location }} replace />
  );
}
