import { IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/tempData";

const ActionsButtons = ({ row: data }) => {
  const users = useSelector((store) => store.user?.users || []);
  const user = useMemo(
    () => users.find((user) => user.id === data?.id) || {},
    [users, data?.id]
  );
  const dispatch = useDispatch();

  return (
    <Tooltip title='Cliquer pour voir les actions' arrow>
      <IconButton
        onClick={() => dispatch(openModal({ modal: "modalUser", data: user }))}>
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ActionsButtons;
