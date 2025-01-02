import React from "react";
import { Button, Card, Typography, Box, useTheme } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
 // Assuming you're using react-router for navigation

const SuccessPage = () => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        maxWidth: 550,
        mx: "auto",
        background: theme.palette.mode === "dark" ? "#09090B" : "white",
      }}
    >
      <Card
        sx={{
          width: "100%",
          sm: "400px",
          p: 3,
          boxShadow: 'none',
          border:
            theme.palette.mode === "dark"
              ? "1px solid #27272A"
              : "1px solid #E4E4E7",
          background: theme.palette.mode === "dark" ? "#09090B" : "white",
        }}
      >
        <Box display="flex" justifyContent="center" mb={3}>
          <CheckCircle sx={{ color: "green", fontSize: 64 }} />
        </Box>
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: 600, color: "text.primary", fontFamily: "serif" }}
        >
          Registration Successful
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "text.secondary", mt: 1 }}
        >
          Thank you for registering, You are now successfully enrolled in our
          system.
          <br />
          {/* {id && <span>Verification ID: {id}</span>} */}
        </Typography>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component="a"
            href="/console/dashboard"
            sx={{
              textTransform: "none",
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default SuccessPage;
