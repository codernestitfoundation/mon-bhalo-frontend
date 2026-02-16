import AdminAnalytics from "@/pages/Admin/AdminAnalytics";
import AllUsers from "@/pages/Admin/AllUsers";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems : ISidebarItem[] = [
    {
      title: " Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          component: AdminAnalytics
        },
      ],
    },
    {
      title: "User Management",
      items: [
        {
          title: "All Users",
          url: "/admin/users",
          component: AllUsers
        },
      ],
    }
  ]