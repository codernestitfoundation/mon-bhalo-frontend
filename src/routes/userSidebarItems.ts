import UserAnalytics from "@/pages/User/UserAnalytics";
import UserBookings from "@/pages/User/UserBookings";
import type { ISidebarItem } from "@/types";

export const userSidebarItems : ISidebarItem[] = [
    {
      title: " Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/user/analytics",
          component: UserAnalytics
        },
      ],
    },
    {
      title: "History",
      items: [
        {
          title: "Booking",
          url: "/user/bookings",
          component: UserBookings
        },
      ],
    }
  ]