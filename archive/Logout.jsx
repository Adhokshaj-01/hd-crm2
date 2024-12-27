import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a logout process
    const logoutUser = () => {
      // Remove the auth token
      localStorage.removeItem("auth_token");

      // Show a brief logout confirmation or perform async cleanup if needed
      setTimeout(() => {
        // Redirect to the login page
        navigate("/auth");
      }, 2000); // Delay to show confirmation (optional)
    };

    logoutUser();
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Logging out...
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "monospace",
          marginTop: 1,
          color: "#FF0000",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        Please wait
      </Typography>
    </Box>
  );
}
