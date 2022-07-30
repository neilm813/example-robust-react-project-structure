import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const pages = [
  { text: 'Destinations', path: '/destinations' },
  { text: 'Create Destination', path: '/destinations/new' },
];

export const TopAppBar = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TravelExploreIcon
            fontSize="large"
            sx={{
              color: (theme) => theme.palette.primary.dark,
              display: { xs: 'none', md: 'flex' },
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            color="secondary.dark"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            Trip Planner
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Typography
                    onClick={() => navigate(page.path)}
                    textAlign="center"
                  >
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <TravelExploreIcon
            sx={{
              color: (theme) => theme.palette.primary.dark,
              display: { xs: 'flex', md: 'none' },
              mr: 1,
            }}
          />
          <Typography
            variant="h5"
            color="secondary.dark"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            Trip Planner
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.path);
                }}
                sx={{
                  color: 'common.white',
                  my: 2,
                  display: 'block',
                }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
