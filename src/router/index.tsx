import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/home.page";
import LoginPage from "../pages/login.page";
import ProfilePage from "../pages/profile.page";
import RegisterPage from "../pages/register.page";
import Validate2faPage from "../pages/validate2fa.page";
import DashboardPage from "../pages/dashboard.page";
import ProjectDetail from "../pages/projectDetail.page";


const authRoutes: RouteObject = {
  path: "*",
  children: [
    // {
    //   index: true,
    //   element: <LoginPage />,
    // },
    {
      path: "login",
      children: [
        {
          path: "",
          element: <LoginPage />,
        },
        {
          path: "validateOtp",
          element: <Validate2faPage />,
        },
      ],
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    
  ],
};

const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },{
      path: "dashboard",
      element: <DashboardPage />,
    },{
      path: "projectDetail/:projectId",
      element: <ProjectDetail />,
    },
  ],
};

const routes: RouteObject[] = [authRoutes, normalRoutes];

export default routes;
