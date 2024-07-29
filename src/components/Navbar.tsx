import React, { useState, useEffect, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import { auth } from "../firebase";
import { UserContext } from "../context/UserContext";

const pages = ["Events", "Sign up", "Sign in"];
const adminPages = ["Create event", "Add admin"];

export default function ResponsiveAppBar() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { isAdmin } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PedalBikeIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Cycling events
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu} component="a" href={
                  page === "Sign up"
                    ? "/sign-up"
                    : page === "Sign in"
                    ? "/sign-in"
                    : "/"
                }>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {isAdmin && adminPages.map((page) => (
              <MenuItem
                key={page}
                component="a"
                onClick={handleCloseNavMenu}
                href={page === "Create event" ? "/create-event" : "/add-admin"}
              >
                {page}
              </MenuItem>
            ))}
            </Menu>
          </Box>
          <PedalBikeIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
           Cycling events 
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                href={
                  page === "Sign up"
                    ? "/sign-up"
                    : page === "Sign in"
                    ? "/sign-in"
                    : "/"
                }
              >
                {page}
              </Button>
            ))}
            {isAdmin && adminPages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
                href={page === "Create event" ? "/create-event" : "/add-admin"}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isSignedIn === true && (
              <Button
                onClick={() =>
                  auth.signOut().then(() => {
                    alert("You signed out");
                    if (window.location.href.endsWith("/create-event") || window.location.href.endsWith("/add-admin")) {
                      window.location.href = "/";
                    }
                  })
                }
                sx={{ my: 2, color: "white", display: "block" }}
              >
               Sign out 
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
