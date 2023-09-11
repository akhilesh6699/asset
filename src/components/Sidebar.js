import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import AppsIcon from "@mui/icons-material/Apps";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Dashboard as DashboardIcon } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAppStore } from "../appstore";
import { MenuItem, TextField, Typography } from "@mui/material";
const StyledListItemButton = styled(ListItemButton)(({ theme, selected }) => ({
  backgroundColor: selected ? "#FFC107" : "transparent",
}));
const StyledListItemIcon = styled(ListItemIcon)(({ theme, selected }) => ({
  color: selected ? "#263238" : "#FFFFFF",
}));
const StyledListItemText = styled(ListItemText)(({ theme, selected }) => ({
  color: selected ? "#263238" : "#FFFFFF",
}));
const Sidebar = () => {
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));
  const drawerWidth = 260;
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });
  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    backgroundColor: "#FFFFFF",
    border: "1px solid #DCDCDC;",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const menuItems = [
    {
      text: "User",
      icon: <PeopleIcon />,
      path: "/user",
    },
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      subItems: [
        {
          text: "Employees",
          icon: <BadgeOutlinedIcon sx={{ fontSize: "25px" }} />,
          path: "/employees",
        },
        {
          text: "Accessories",
          icon: <FolderIcon sx={{ fontSize: "25px" }} />,
          path: "/accessories",
        },
      ],
      path: "/dashboard",
    },
    {
      text: "Masters",
      icon: <AppsIcon />,
      subItems: [
        {
          text: "Add Employees",
          icon: <GroupAddOutlinedIcon />,
          path: "/add employees",
        },
        {
          text: "Add Accessories",
          icon: <PostAddOutlinedIcon />,
          path: "/add accessories",
        },
      ],
    },
    {
      text: "Calendar",
      icon: <CalendarMonthIcon />,
      path: "/calendar",
    },
    {
      text: "Logout",
      icon: <LogoutIcon />,
      path: "/",
    },
  ];
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = React.useState(null);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    const path = location.pathname;
    const item = menuItems.find((item) => item.path === path);
    setSelectedItem(item);
  }, [location]);
  const handleListItemClick = (item) => {
    if (item.subItems) {
      setSelectedItem((prevItem) =>
        prevItem === item && prevItem.open
          ? null
          : { ...item, open: !prevItem?.open }
      );
    } else {
      setSelectedItem(item);
      if (item.path === "/") {
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedin");
        navigate(item.path);
      } else {
        navigate(item.path);
      }
    }
  };
  const renderMenuItems = () => {
    return menuItems.map((item) => {
      const isSubItemOpen =
        selectedItem?.text === item.text && selectedItem?.open;
      if (item.subItems) {
        return (
          <React.Fragment key={item.text}>
            <ListItemButton
              onClick={() => handleListItemClick(item)}
              selected={selectedItem?.text === item.text}
            >
              <ListItemIcon
                style={{ color: selectedItem === item ? "#87C1DC" : "#000" }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ style: { color: "black" } }}
              />
              {isSubItemOpen ? (
                <ListItemIcon>
                  <IconButton edge="end">
                    <ExpandLessIcon />
                  </IconButton>
                </ListItemIcon>
              ) : (
                <ListItemIcon>
                  <IconButton edge="end">
                    <ExpandMoreIcon />
                  </IconButton>
                </ListItemIcon>
              )}
            </ListItemButton>
            {isSubItemOpen &&
              item.subItems.map((subItem) => (
                <ListItemButton
                  key={subItem.text}
                  sx={{
                    pl: 4,
                    backgroundColor:
                      selectedItem === item ? "white" : "transparent",
                    borderRadius: 3,
                  }}
                  onClick={() => handleListItemClick(subItem)}
                  selected={selectedItem?.text === subItem.text}
                >
                  <ListItemText
                    primary={subItem.text}
                    primaryTypographyProps={{
                      style: {
                        color: selectedItem === item ? "#000" : "#000",
                      },
                    }}
                  />
                </ListItemButton>
              ))}
          </React.Fragment>
        );
      } else {
        return (
          <ListItemButton
            key={item.text}
            onClick={() => handleListItemClick(item)}
            selected={selectedItem?.text === item.text}
          >
            <ListItemIcon
              style={{ color: selectedItem === item ? "#87C1DC" : "#000" }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                style: { color: selectedItem === item ? "#87C1DC" : "#000" },
              }}
            />
          </ListItemButton>
        );
      }
    });
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />{" "}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{ sx: { backgroundColor: "#87C1DC", color: "white" } }}
      >
        <DrawerHeader>
          <Box
            onClick={() => navigate("/dashboard")}
            sx={{ marginRight: { xs: "50px", sm: "50px" }, cursor: "pointer" }}
          >
            <Typography
              sx={{ fontWeight: "bold", fontSize: "20px", color: "black" }}
            >
              ASSET TRACKER
            </Typography>
          </Box>
        </DrawerHeader>
        <List>{renderMenuItems()}</List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
};
export default Sidebar;
