import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useModel } from "../Residences/AddResidences/AddResidencesModel";
export default function ProfileMenu({ user, logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const nav = useNavigate();
  const { handelToggleModel, handleOpen } = useModel();

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt={user?.Name}
              src={
                user?.Picture ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              }
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose;
            nav(ROUTES.EDITUSERPROFILE);
          }}
        >
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose;
            nav(ROUTES.MYRESIDENCES);
          }}
        >
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          My Properties
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose;
            handleOpen();
          }}
        >
          <ListItemIcon>
            <AddBusinessIcon fontSize="small" />
          </ListItemIcon>
          Add Properties
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose;
            nav(ROUTES.FAVORITERESIDENCES);
          }}
        >
          <ListItemIcon>
            <FavoriteIcon fontSize="small" />
          </ListItemIcon>
          My Favirote
        </MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.clear();
            logout();
            handleClose;
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
