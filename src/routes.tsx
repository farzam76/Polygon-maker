import { useRoutes } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "layouts";
import { Login, CreateAccount } from "modules/authentication/screens";
import { ProjectsList } from "modules/projects/screens/projects-list";
import { ProjectScene } from "modules/projects/screens/project-scene";
import PrivateRoute from "PrivateRoute";
//TODO: FIX THIS
export default function Router() {
  const element = useRoutes([
    {
      element: <AuthLayout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "signup", element: <CreateAccount /> },
      ],
    },
    {
      element: <DashboardLayout />,
      children: [
        { path: "/app", element: <PrivateRoute element={<ProjectsList />} /> },
        { path: "/:id", element: <ProjectScene /> },
      ],
    },
  ]);
  return element;
}
