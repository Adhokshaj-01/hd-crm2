import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";

const RedirectHandler = () => {
  const [loading, setLoading] = useState(true);
  const [animationText, setAnimationText] = useState(""); // Holds the random binary/hex string
  const navigate = useNavigate();

  useEffect(() => {
    // Function to generate random binary/hex strings
    const generateRandomText = () => {
      const characters = "0123456789ABCDEF"; // Hexadecimal characters
      return Array.from({ length: 8 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
    };

    // Update the animation text periodically
    const interval = setInterval(() => {
      setAnimationText(generateRandomText());
    }, 200); // Update every 200ms

    // Simulated authentication delay
    const checkAuthToken = () => {
      const authToken = localStorage.getItem("auth_token");
      setTimeout(() => {
        clearInterval(interval); // Stop the animation
        if (authToken) {
          navigate("/console"); // Redirect to home
        } else {
          navigate("/auth"); // Redirect to login
        }
        setLoading(false);
      }, 5000); // Simulated 5-second delay
    };

    checkAuthToken();

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        //   backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Authenticating...
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: "monospace",
            marginTop: 1,
            // backgroundColor: "#121212",
            color: "#00FF00",
            padding: "4px 8px",
            borderRadius: "4px",
          }}
        >
          {animationText}
        </Typography>
      </Box>
    );
  }

  return null; // Render nothing after redirection
};

export default RedirectHandler;
