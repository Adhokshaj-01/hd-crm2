import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";
import ThemeToggleButton from "./ThemeToggleButton";

export const ThemeProviderWrapper = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    window.localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          background: {
            default: darkMode ? "#09090B" : "#ffffff", // Use your preferred light mode color for contrast
          },
          components: {
            MuiSvgIcon: {
              styleOverrides: {
                root: {
                  color: darkMode ? "#ffffff" : "#000000",
                },
              },
            },
          },
        },

      }),
    [darkMode]
  );

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          zIndex: 10,
        }}
      >
        <ThemeToggleButton toggleTheme={toggleTheme} />
      </Box>
      {children}
    </ThemeProvider>
  );
};


