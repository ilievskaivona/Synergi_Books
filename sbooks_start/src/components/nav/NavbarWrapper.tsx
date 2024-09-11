import React from "react";
import { Grid } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const NavbarWrapper = () => {
  const drawerWidth = 240;

  return (
    <Grid sx={{ display: "flex", padding: "35px" }}>
      <Navbar />
      <Sidebar />
    </Grid>
  );
};

export default NavbarWrapper;
