import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import style from "./styles";

function NavigationBar() {
  let navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };
  const pages = ["Dashboard"];
  const settings = ["Profile", "Logout"];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={style.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PlaylistAddCheckIcon sx={style.logo} fontSize="large" />
          <Typography
            variant="h4"
            noWrap
            component={Link}
            to="/project"
            sx={style.title}
          >
            ZDD
          </Typography>

          <Box sx={style.box}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={style.menu}
            ></Menu>
          </Box>
          <PlaylistAddCheckIcon sx={style.logoSmall} fontSize="large" />
          <Typography
            variant="h4"
            noWrap
            component={Link}
            to="/"
            sx={style.titleSmall}
          >
            ZDD
          </Typography>
          <Box sx={style.box2}>
            {pages.map((page) => (
              <Button key={page} sx={style.button}>
                <Link
                  to={
                    page.toLowerCase() === "dashboard"
                      ? "/project"
                      : "/" + page.toLowerCase()
                  }
                  style={style.link}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem>
                  <Button component={Link} to="/profile" fullWidth>
                    Profile
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button onClick={handleLogout} fullWidth>
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavigationBar;
