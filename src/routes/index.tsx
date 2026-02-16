import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import ForgotPassword from "@/pages/ForgotPassword";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import VerifyEmail from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { psychologistSidebarItems } from "./psychologistSidebarItems";

export const router = createBrowserRouter([
    {
        Component: App,
        path: "/",
        children: [{
            Component: About,
            path: "about"
        }]
    },
    {
        Component: DashboardLayout,
        path: "/admin",
        children : [...generateRoutes(adminSidebarItems)]
    },
    {
        Component: DashboardLayout,
        path: "/user",
        children : [...generateRoutes(userSidebarItems)]
    },
    {
        Component: DashboardLayout,
        path: "/psychologist",
        children : [...generateRoutes(psychologistSidebarItems)]
    },
    {
        Component: Login,
        path: "/login"
    },
    {
        Component: Register,
        path: "/register"
    },
    {
        Component: ForgotPassword,
        path: "forgot-password"
    },
    {
        Component: VerifyEmail,
        path: "/verify"
    }

])