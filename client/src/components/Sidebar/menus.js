import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import ContactsIcon from "@mui/icons-material/Contacts";
import InfoIcon from "@mui/icons-material/Info";
import MessageIcon from "@mui/icons-material/Message";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import FolderIcon from "@mui/icons-material/Folder";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

const commonMenus = [
  {
    id: 1,
    label: "Dashboard",
    path: "/auth/dashboard",
    icon: DashboardIcon,
  },
  {
    id: 100,
    label: "Prendre un congé",
    path: "/auth/take/a/leave",
    icon: HolidayVillageIcon,
  },
  {
    id: 2,
    label: "Tâches",
    path: "/auth/tasks",
    icon: AssignmentIcon,
  },
  // {
  //   id: 2,
  //   label: "Messages",
  //   path: "/auth/messages",
  //   icon: MessageIcon,
  // },
  // {
  //   id: 3,
  //   label: "Contacter un freelance",
  //   path: "/auth/contact/a/freelance",
  //   icon: ContactMailIcon,
  // },
];

const menus = {
  admin: [
    ...commonMenus,
    {
      id: 4,
      label: "Utilisateurs",
      path: "/auth/users",
      icon: PeopleIcon,
    },
    {
      id: 6,
      label: "Entreprises",
      path: "/auth/companies",
      icon: ApartmentIcon,
    },
    {
      id: 98,
      label: "Créer un compte admin",
      path: "/auth/create/admin",
      icon: AddBoxIcon,
    },
  ],
  manager: [
    ...commonMenus,
    {
      id: 3,
      label: "Projets",
      path: "/auth/projects",
      icon: ListAltIcon,
    },
    {
      id: 5,
      label: "Employés",
      path: "/auth/employees",
      icon: PeopleIcon,
    },
    {
      id: 6,
      label: "Paiements",
      path: "/auth/payments",
      icon: PaymentsIcon,
    },
    {
      id: 99,
      label: "Congés",
      path: "/auth/leaves",
      icon: WorkHistoryIcon,
    },
  ],
  employee: [
    ...commonMenus,
    {
      id: 6,
      label: "Paiements",
      path: "/auth/payments",
      icon: PaymentsIcon,
    },
    // {
    //   id: 8,
    //   label: "Rapport de travail",
    //  path: "/auth/about",
    //   icon: InfoIcon,
    // },
  ],
  freelance: [
    ...commonMenus,
    {
      id: 3,
      label: "Projets",
      path: "/auth/projects",
      icon: ListAltIcon,
    },
    {
      id: 6,
      label: "Paiements",
      path: "/auth/payments",
      icon: PaymentsIcon,
    },
    // {
    //   id: 7,
    //   label: "Missions",
    //   path: "/auth/tasks",
    //   icon: AssignmentIcon,
    // },
    // {
    //   id: 8,
    //   label: "Rapport de travail",
    //  path: "/auth/about",
    //   icon: InfoIcon,
    // },
    {
      id: 9,
      label: "Rejoindre une entreprise",
      path: "/auth/join/a/company",
      icon: AddBusinessIcon,
    },
  ],
};

export default menus;
