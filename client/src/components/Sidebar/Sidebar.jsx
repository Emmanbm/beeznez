import React from "react";
import { Drawer, List, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
// import Menus from "./Menus";
import { menus } from "./menus";
import SidebarMenu from "./SidebarMenu";

const Sidebar = () => {
  const open = useSelector((store) => store.app?.openSidebar);
  return (
    <Drawer variant='persistent' anchor='left' open={open}>
      <Toolbar />
      <List sx={{ width: { xs: "100vw", sm: "100vw", md: "15vw" } }}>
        {menus.map((menu) => (
          <SidebarMenu key={menu.id} {...menu} />
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
