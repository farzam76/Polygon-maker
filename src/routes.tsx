import { useRoutes } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "layouts";
import { Login, Signup } from "modules/authentication/screens";
import { ProjectsList, ProjectScene } from "modules/projects/screens";
import PrivateRoute from "PrivateRoute";
import { Suspense } from "react";

export const appRoutes = {
  BASE_ROUTE: "/",
  LOGIN_ROUTE: "/login",
  SIGNUP_ROUTE: "/signup",
  PROJECT_ROUTE: "/app",
  SCENE_ROUTE: "/app/:id",
};

export default function Router() {
  const element = useRoutes([
    {
      element: <AuthLayout />,
      children: [
        {
          path: appRoutes.LOGIN_ROUTE,
          element: (
            <Suspense fallback={"...loading"}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: appRoutes.SIGNUP_ROUTE,
          element: (
            <Suspense fallback={"...loading"}>
              <Signup />{" "}
            </Suspense>
          ),
        },
      ],
    },
    {
      path: appRoutes.BASE_ROUTE,
      element: <DashboardLayout />,
      children: [
        {
          path: appRoutes.PROJECT_ROUTE,
          element: <PrivateRoute element={<Suspense fallback={"...loading"}>
            <ProjectsList />
          </Suspense>} />,
        },
        {
          path: appRoutes.SCENE_ROUTE,
          element: <PrivateRoute element={<Suspense fallback={"...loading"}>
            <ProjectScene />
          </Suspense>} />,
        },
      ],
    },
  ]);
  return element;
}
