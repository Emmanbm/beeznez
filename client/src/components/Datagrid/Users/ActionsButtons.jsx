import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import React, { useState } from "react";
import { actions } from "./actions";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const ActionsButtons = ({ row: data, ...otherProps }) => {
  const users = useSelector((store) => store.user?.users || []);
  const user = useMemo(
    () => users.find((user) => user.id === data?.id) || {},
    [users, data?.id]
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickAction = (obj) => () => {
    if (typeof obj?.action === "function") obj.action();
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}>
        {actions(user, dispatch).map((act) => (
          <MenuItem onClick={handleClickAction(act)} dense key={act.key}>
            <ListItemIcon>{React.createElement(act.icon)}</ListItemIcon>
            <ListItemText>{act.title}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
      <Tooltip title='Cliquer pour voir les actions' arrow>
        <IconButton onClick={handleClickMenu}>
          <MoreHorizOutlinedIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ActionsButtons;
