import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const actions = (user, dispatch) => [
  {
    key: "editUser",
    title: "Éditer",
    forAdminOnly: true,
    icon: EditOutlinedIcon,
    action() {
      console.log(user);
    },
  },
  {
    key: "deleteUser",
    title: "Supprimer",
    forAdminOnly: true,
    icon: DeleteOutlineOutlinedIcon,
    action() {
      console.log(user);
    },
  },
];
