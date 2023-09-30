import React, { useState } from "react";
import "./Header.css";
import useHeaderColor from "../../../hooks/useHeaderColor";
import { Box, Button, Typography, ListItemButton, List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";
import ProfileMenu from "../../ProfileMenu/ProfileMenu";
import { useContext } from "react";
import UserDetailsContext from "../../../context/UserDetailsContext";
import { deleteUserFromLocalStorge } from "../../../services/LocalStorge";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightIcon from "@mui/icons-material/Nightlight";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "../../../providers/Thems";
import "./Header.css";
import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const Header = () => {
  const headerColor = useHeaderColor();
  const navigate = useNavigate();

  const { setUserDetails, UserDetails } = useContext(UserDetailsContext);

  const logout = () => {
    deleteUserFromLocalStorge();
    setUserDetails(null);
    navigate(ROUTES.ROOT);
  };
  const [open, setOpen] = useState(false);

  const { isDark, togleIsDark } = useTheme();
  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <img
          className="mylogo"
          onClick={() => {
            navigate(ROUTES.ROOT);
          }}
          src="./logo.png"
          alt="logo"
          width={60}
        />

        {/* menu */}
        <div>
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
          >
            <Button size="small" variant="contained">
              <a href="#contact-us">Contact Us</a>
            </Button>
            <Button
              size="small"
              onClick={() => {
                navigate(ROUTES.RESIDENCES);
              }}
              variant="contained"
            >
              Residences
            </Button>

            <Button
              size="large"
              color="warning"
              onClick={() => {
                navigate(ROUTES.ROOT);
              }}
              variant="contained"
            >
              Home
            </Button>
            {!UserDetails ? (
              <Button
                size="large"
                color="warning"
                onClick={() => {
                  navigate(ROUTES.LOGIN);
                }}
                variant="contained"
              >
                Login
              </Button>
            ) : (
              <ProfileMenu user={UserDetails} logout={logout} />
            )}
            {isDark ? (
              <IconButton onClick={togleIsDark} aria-label="delete">
                <LightModeIcon />
              </IconButton>
            ) : (
              <IconButton onClick={togleIsDark} aria-label="delete">
                <NightlightIcon sx={{ color: "white" }} />
              </IconButton>
            )}
          </div>
        </div>

        {/* for medium and small screens */}
        <span className="menu-icon">
          <Box>
            {UserDetails && (
              <Box sx={{ pr:"2px" }}>
                <ProfileMenu user={UserDetails} logout={logout} />
              </Box>
            )}
          </Box>

          <IconButton
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(true)}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            <List
              size="lg"
              component="nav"
              sx={{
                display: "flex",
                flexDirection: "column",
                fontSize: "xxl",
                height: "60vh",
                "& > div": { justifyContent: "center", alignItems: "center" },
              }}
            >
              <ListItemButton sx={{ fontWeight: "lg" }}>
                <Button
                  size="large"
                  color="warning"
                  onClick={() => {
                    setOpen(false);
                    navigate(ROUTES.ROOT);
                  }}
                  variant="contained"
                >
                  Home
                </Button>
              </ListItemButton>
              <ListItemButton>
                <Button
                  onClick={() => {
                    setOpen(false);

                    navigate(ROUTES.RESIDENCES);
                  }}
                  variant="contained"
                >
                  Residences
                </Button>
              </ListItemButton>
              <ListItemButton>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setOpen(false);
                    togleIsDark();
                  }}
                >
                  {!isDark ? "Dark Theme" : "light Theme"}
                </Button>
              </ListItemButton>
              {!UserDetails && (
                <ListItemButton>
                  <Button
                    size="large"
                    color="warning"
                    onClick={() => {
                      navigate(ROUTES.LOGIN);
                      setOpen(false);
                    }}
                    variant="contained"
                  >
                    Login
                  </Button>
                </ListItemButton>
              )}
              <ListItemButton>
                <Button
                variant="outlined"
                  component="a"
                  onClick={() => {
                    setOpen(false);
                  }}
                  href="#contact-us"
                >
                  Contact
                </Button>
              </ListItemButton>
            </List>
          </Drawer>
        </span>
      </div>
    </section>
  );
};

export default Header;
