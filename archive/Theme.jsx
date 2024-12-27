import React, { useState} from 'react';
import {  IconButton } from '@mui/material';
import { SunDim, MoonStar } from 'lucide-react';
export default function ThemeToggleButton({ toggleTheme, styling }) {
  const [isToggling, setIsToggling] = useState(false);

  const handleToggle = () => {
    setIsToggling(true);
    toggleTheme(); // Trigger the theme toggle function passed as a prop
    setTimeout(() => setIsToggling(false), 200); // Animation time for rotation effect
  };

  return (
      <IconButton aria-label="delete" onClick={handleToggle}
      variant='outlined'
      style={styling} 
      size='small'>
      {window.localStorage.getItem('theme') === 'dark' ? (
        <SunDim
          style={{
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            transform: isToggling ? 'rotate(180deg) scale(0.5)' : 'rotate(0deg) scale(1)',
        opacity: isToggling ? 0.5 : 1,
          }}
        />
      ) : (
        <MoonStar
          style={{
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            transform: isToggling ? 'rotate(180deg) scale(0.5)' : 'rotate(0deg) scale(1)',
        opacity: isToggling ? 0.5 : 1,
          }}
        />
      )}
      </IconButton>

  );
}
