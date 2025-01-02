import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  useTheme,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import {  LayoutDashboard, LogOut } from "lucide-react";
import RouteIcon from '@mui/icons-material/Route';
import User from "../../Images/user/user.png";
import decode from "./hook/decode";

function ProtectedLayout() {
  const theme = useTheme();
  const location = useLocation(); // To get the current path
  const [anchorEl, setAnchorEl] = useState(null);
  const [un, setUN] = useState("");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    handleProfileMenuClose();
    window.location.href = "/auth";
  };

  useEffect(() => {
    const fetchTokenAndPermissions = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          console.warn("No token found");
          return;
        }

        const decodedToken = decode();
        setUN(decodedToken?.email);
        if (!decodedToken) {
          console.warn("Invalid token");
          return;
        }
      } catch (error) {
        console.error("Error processing token or permissions:", error);
      }
    };

    fetchTokenAndPermissions();
  }, []);

  // Create breadcrumbs dynamically based on the current path
  const breadcrumbs = location.pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment, index, array) => {
      const path = `/${array.slice(0, index + 1).join("/")}`;
      const isLast = index === array.length - 1;

      return isLast ? (
        <Typography key={path} color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
          {segment.charAt(0).toUpperCase() + segment.slice(1)}
        </Typography>
      ) : (
        <Link
          key={path}
          to={path}
          style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
        >
           <RouteIcon style={{ marginRight: 5 }} fontSize="inherit" />
          {segment.charAt(0).toUpperCase() + segment.slice(1)}
        </Link>
      );
    });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <AppBar
        position="sticky"
        sx={{
          background: theme.palette.mode === "dark" ? "#09090B" : "white",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 2px rgba(0, 0, 0, 1)"
              : "0 2px 2px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left-aligned Breadcrumbs */}
          <Breadcrumbs aria-label="breadcrumb" separator="›" sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                color: theme.palette.mode === "dark" ? "white" : "black",
              }}
            >
              <LayoutDashboard
            className="mx-7"
            color={theme.palette.mode === "dark" ? "white" : "black"}
          />
            </Link>
            {breadcrumbs}
          </Breadcrumbs>

          {/* Right-side Profile Menu */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <Avatar alt="user" src={User} sx={{ width: 30, height: 30 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem sx={{ fontSize: "0.875rem" }}>
                {un === "" ? "user@mail.cxyz" : un}
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleLogout}
                sx={{ fontSize: "0.875rem", color: "red" }}
              >
                <LogOut size={10} style={{ marginRight: 10 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Box
          sx={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default ProtectedLayout;
