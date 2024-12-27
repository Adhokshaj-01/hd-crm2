import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box ,AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Divider, useTheme } from '@mui/material';
import {  LayoutDashboard, LogOut } from 'lucide-react';
// import { Menu as MenuIcon } from '@mui/icons-material'; // For the menu icon if needed (optional)
import User from '../../Images/user/user.png'
function ProtectedLayout() {
  // theme 
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null); // State to control the profile menu
  // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("auth_token"));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    // Clear authentication token and redirect to login
    localStorage.removeItem("auth_token");
    // setIsAuthenticated(false);
    handleProfileMenuClose();
    // Redirect to login (or handle redirect logic here)
    window.location.href = '/auth'; // Redirect to login
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{
          background: theme.palette.mode === 'dark' ? '#121212' : 'white',
        boxShadow:'0 2px 2px rgba(0, 0, 0, 0.1)'}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <LayoutDashboard className='mx-7' color={theme.palette.mode === 'dark' ? 'white' : 'black'} />
          {/* Right-side Profile Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <Avatar alt="user" src={User}  sx={{ width: 30, height: 30 }}/>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem 
              sx={{ fontSize: '0.875rem' }}
              > 
                user@mail.co
              </MenuItem>
              <Divider/>
              <MenuItem onClick={handleLogout} 
              sx={{ fontSize: '0.875rem', color:'red'}}  
              >
                <LogOut size={10} style={{ marginRight: 10 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar can be removed, replaced by a horizontal layout */}
        <Box
          sx={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
          }}
        >
          <Outlet /> {/* This is where the child components (Dashboard, Register, etc.) will be rendered */}
        </Box>
      </Box>
    </Box>
  );
}

export default ProtectedLayout;

