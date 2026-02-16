import PsychologistAnalytics from "@/pages/Psychologist/PsychologistAnalytics";
import PsychologistBookings from "@/pages/Psychologist/PsychologistBookings";
import type { ISidebarItem } from "@/types";

export const psychologistSidebarItems : ISidebarItem[] = [
    {
      title: " Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/psychologist/analytics",
          component: PsychologistAnalytics
        }
      ],
    },
    {
      title: "History",
      items: [
        {
          title: "Booking",
          url: "/psychologist/bookings",
          component: PsychologistBookings
        },
      ],
    }
  ]