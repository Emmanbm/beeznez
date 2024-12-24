import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
export const settingsOptions = [
  {
    id: 1,
    label: "Paramètres du compte",
    value: "account",
    icon: SettingsIcon,
    action: { type: "tempData/toggleUpdateUser" },
  },
  {
    id: 2,
    label: "Déconnexion",
    value: "logout",
    icon: LogoutIcon,
    action: { type: "user/logout" },
  },
];
