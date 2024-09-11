import { Grid, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router";
import book from "../../assets/icons/book.svg";
import library from "../../assets/icons/library.svg";
import logo from "../../assets/icons/logo.svg";
import review from "../../assets/icons/review.svg";
import user from "../../assets/icons/user.svg";
import React from "react";

const LogoItem = [
    {
    id: 1,
    icon: logo,
    label: "Synergi",
    route: "/",
    }
]

const SideBarItemsManagement= [
    {
        id:1, 
        icon: user,
        label: "Manage Users",
        route: "/manage-users"
    },
    {
        id:2,
        icon: review,
        label: "Review materials",
        route: "/management/review-materials"

    },
]

const SideBarItemsEditor = [
    {
        id:1,
        icon: library,
        label: "Library",
        route: "/library"
    },
    {
        id:2, 
        icon: book,
        label: "My books",
        route: "/my-books"
    }
]

const drawerWidth = 283;
interface Props {
  window?: () => Window;
}

const Sidebar = (props: Props) => {
  const navigate = useNavigate();

  const { window } = props;

  const drawer = (
    <Grid sx={{ padding: "32px" }}>
      <Toolbar sx={{ top: "0", display: "contents" }}>
        <List sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
          {LogoItem.map((text, index) => (
            <ListItem
              key={text.id}
              disablePadding
              onClick={() => navigate(text.route)}
            >
              <ListItemButton
                sx={{
                  paddingLeft: "0px",
                  paddingTop: "0px",
                  display: "contents",
                  gap: "9px",
                }}
              >
                <ListItemIcon>{<img src={text.icon} />}</ListItemIcon>
                <ListItemText primary={text.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Toolbar>
   
        
      <Typography
        variant="captionBold"
        sx={{
          display: "flex",
          paddingTop: "44px",
          paddingBottom: "16px",
          color: "neutral500",
        }}
      >
        MANAGEMENT
      </Typography>
     
        <List sx={{ gap: "20px", padding: "0px" }}>
        <Typography variant="p2Medium" color="neutral500" text-edge="cap">
          {SideBarItemsManagement.map((text, index) => (
            <ListItem
              key={text.id}
              sx={{ padding: "16px 12px" }}
              disablePadding
              onClick={() => navigate(text.route)}
            >
              <ListItemButton sx={{ gap: "12px", padding: "0px" }}>
                <ListItemIcon sx={{ display: "contents" }}>
                  {<img width={"22px"} src={text.icon} />}
                </ListItemIcon>
                <ListItemText
                  primary={text.label}
                  sx={{ display: "contents" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          </Typography>
        </List>
      
        <Typography
        variant="captionBold"
        sx={{
          display: "flex",
          paddingTop: "44px",
          paddingBottom: "16px",
          color: "neutral500",
        }}
      >
        EDITOR
      </Typography>
      <List sx={{ gap: "20px", padding: "0px" }}>
      <Typography variant="p2Medium" color="neutral500" text-edge="cap">
          {SideBarItemsEditor.map((text, index) => (
            <ListItem
              key={text.id}
              disablePadding
              sx={{ padding: "16px 12px" }}
              onClick={() => navigate(text.route)}
            >
              <ListItemButton sx={{ gap: "12px", padding: "0px" }}>
                <ListItemIcon sx={{ display: "contents" }}>
                  {<img width={"22px"} src={text.icon} />}
                </ListItemIcon>
                <ListItemText
                  primary={text.label}
                  sx={{ display: "contents" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          </Typography>
      </List>
    </Grid>
  );

  return (
    <Grid sx={{ display: "flex" }}>
      <Grid
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Grid>
    </Grid>
  );
};
export default Sidebar;