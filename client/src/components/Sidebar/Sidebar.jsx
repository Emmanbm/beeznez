import React from "react";
import { Drawer, List, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import menus from "./menus";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  const open = useSelector((store) => store.app?.openSidebar);
  const role = useSelector((store) => store.user?.role);
  if (!Boolean(menus[role]?.length)) return null;
  return (
    <Drawer variant='persistent' anchor='left' open={open}>
      <Toolbar />
      <List sx={{ width: { xs: "100vw", sm: "100vw", md: "15vw" } }}>
        {menus[role]
          .sort((a, b) => a.id - b.id)
          .map((menu, index) => (
            <SidebarMenu key={index} {...menu} />
          ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
