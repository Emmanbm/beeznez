import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import ContactsIcon from "@mui/icons-material/Contacts";
import InfoIcon from "@mui/icons-material/Info";

export const menus = [
  {
    id: 1,
    label: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
    authenticationRequired: true,
  },
  {
    id: 2,
    label: "Employés",
    path: "/employees",
    icon: PeopleIcon,
    authenticationRequired: true,
  },
  {
    id: 3,
    label: "Paiements",
    path: "/payments",
    icon: PaymentsIcon,
    authenticationRequired: true,
  },
  {
    id: 4,
    label: "Contact",
    path: "/contact",
    icon: ContactsIcon,
    authenticationRequired: true,
  },
  {
    id: 5,
    label: "À propos",
    path: "/about",
    icon: InfoIcon,
    authenticationRequired: true,
  },
];
