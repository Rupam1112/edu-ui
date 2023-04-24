import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import SubjectIcon from "@mui/icons-material/Subject";
import {
  Box,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
  getOptionSelected: (val: string) => void;
}

const Drawer = ({
  open,
  handleDrawerClose,
  getOptionSelected,
}: DrawerProps) => {
  const theme = useTheme();
  const [item, setItem] = useState(1);
  const openedMixin = (theme: Theme): CSSObject => ({
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
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
  const AppDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: 240,
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

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const data = [
    {
      key: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      key: "school",
      title: "Schools",
      icon: <SchoolIcon />,
    },
    {
      key: "user",
      title: "Users",
      icon: <GroupIcon />,
    },
    {
      key: "grade",
      title: "Grade",
      icon: <SubjectIcon />,
    },
  ];

  const loggedInUser = window.localStorage.getItem("loggedInUser");
  let userLoggedIn: any = {};
  if (loggedInUser) {
    userLoggedIn = JSON.parse(loggedInUser);
  }
  const filterOptions = () => {
    if (userLoggedIn.role === "Student") {
      return data.filter((item) => item.key != "user");
    } else if (userLoggedIn.role === "Staff") {
      return data.filter((item) => item.key != "grade");
    } else return data;
  };
  const options = filterOptions();
  return (
    <AppDrawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={() => handleDrawerClose()}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {options.map((item) => (
          <ListItem
            key={item.key}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => getOptionSelected(item.key)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <Tooltip title={item.title}>{item.icon}</Tooltip>
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
            <Divider />
          </ListItem>
        ))}
      </List>
    </AppDrawer>
  );
};
export default Drawer;
