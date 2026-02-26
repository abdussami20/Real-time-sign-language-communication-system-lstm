import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <AppBar position="static" sx={{ backgroundImage: 'url(/images/bg3.png)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img src="/images/bg3.png" alt="Logo" style={{ height: 60, width: 60, objectFit: 'contain', marginRight: 12 }} />
          <Typography variant="h6" component="div">
            Sign Language Recognition
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/" sx={{ fontWeight: location.pathname === '/' ? 'bold' : 'normal' }}>
          Home
        </Button>
        <Button color="inherit" component={Link} to="/detect" sx={{ fontWeight: location.pathname === '/detect' ? 'bold' : 'normal' }}>
          Detect Sign
        </Button>
        <Button color="inherit" component={Link} to="/speech" sx={{ fontWeight: location.pathname === '/speech' ? 'bold' : 'normal' }}>
          Speech to Text
        </Button>
        <Button color="inherit" component={Link} to="/about" sx={{ fontWeight: location.pathname === '/about' ? 'bold' : 'normal' }}>
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
