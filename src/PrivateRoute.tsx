import { Navigate, useLocation } from "react-router-dom";

import { useAppSelector } from "hooks";

export default function PrivateRoute({ element }: { element: JSX.Element }) {
  const isLoggedIn = useAppSelector((state) => state.authentication.isLoggedIn);
  const location = useLocation();

  return isLoggedIn ? (
    element
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
