import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { SunDim, MoonStar } from "lucide-react";

export default function ThemeToggleButton({ toggleTheme, style }) {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = () => {
    setIsToggling(true);
    toggleTheme(); // Call the theme toggle function from props
    setTimeout(() => setIsToggling(false), 200); // Simulate toggle animation
  };

  return (
    <IconButton
      onClick={handleToggle}
      title="Toggle Theme"
      sx={{ position: "fixed", right: 10, bottom: 8, fontSize: "0.5rem" }}
    >
      {window.localStorage.getItem("theme") === "dark" ? (
        <SunDim
          style={{
            transition: "all 0.3s ease",
            // transform: isToggling ? "rotate(180deg) scale(0.8)" : "rotate(0deg)",
            transform: isToggling
              ? "translateY(15px) scale(0.4)"
              : "translateY(0)",
            opacity: isToggling ? 0.5 : 1,
          }}
        />
      ) : (
        <MoonStar
          style={{
            transition: "all 0.3s ease",
            // transform: isToggling ? "rotate(180deg) scale(0.8)" : "rotate(0deg)",
            transform: isToggling
              ? "translateY(15px) scale(0.4)"
              : "translateY(0)",
            opacity: isToggling ? 0.5 : 1,
          }}
        />
      )}
    </IconButton>
  );
}
