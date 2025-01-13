import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PayUser from "./PayUser";
import DeleteUser from "./DeleteUser";
import React from "react";

export const actions = (user) => [
  {
    title: "Effectuer un paiement",
    defaultExpanded: true,
    ariaControls: "panel1-content",
    id: "panel1-header",
    children: React.createElement(PayUser, { user }),
  },
  {
    title: "Supprimer cet utilisateur",
    ariaControls: "panel2-content",
    id: "panel2-header",
    children: React.createElement(DeleteUser, { user }),
  },
];
