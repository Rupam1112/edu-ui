import * as React from "react";
import { styled } from "@mui/material/styles";

import {
  Box,
  Toolbar,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "../component/drawer";
import CustomModal from "../component/customModal";
import EditProfile from "./editProfile";
import "./styles.scss";
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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

const Navbar = () => {
  const history = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);
  const [editProfile, setEditProfile] = React.useState(false);

  const handlePasswordModal = () => {
    setChangePassword(!changePassword);
    handleClose();
  };
  const handleEditProfile = () => {
    setEditProfile(!editProfile);
    handleClose();
  };
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    history("/");
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getOptionSelected = (val: string) => {
    history("/" + `${val}`);
  };
  const loggedInUser = window.localStorage.getItem("loggedInUser");
  let userLoggedIn: any = {};
  if (loggedInUser) {
    userLoggedIn = JSON.parse(loggedInUser);
  }
  return (
    <Box sx={{ display: "flex" }}>
      {editProfile && (
        <EditProfile
          onCancel={handleEditProfile}
          type="edit"
          userData={userLoggedIn}
        />
      )}
      {changePassword && (
        <CustomModal
          open={changePassword}
          handleChangePassword={handlePasswordModal}
        />
      )}
      <CssBaseline />
      <AppBar position="fixed" open={open} className="nav-bar">
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
            <MenuIcon color="action" />
          </IconButton>
          <div className="user-profile">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle color="action" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handlePasswordModal}>Change Password</MenuItem>
              <MenuItem onClick={handleEditProfile}>Edit Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        handleDrawerClose={handleDrawerClose}
        getOptionSelected={getOptionSelected}
      />
    </Box>
  );
};

export default Navbar;
