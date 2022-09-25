import * as React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
// import TravelExploreIcon from '@mui/icons-material/TravelExplore';

import logoMonumentsPlane from '../../assets/images/logo-monuments-plane.png';

const pages = [
  { text: 'Destinations', path: '/destinations' },
  { text: 'Create Destination', path: '/destinations/new' },
];

export const TopAppBar = (props) => {
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
          <RouterLink to="/">
            <Box
              component="img"
              src={logoMonumentsPlane}
              alt="logo"
              sx={{ width: (theme) => theme.spacing(20) }}
            />
          </RouterLink>
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
                    color="primary"
                    textAlign="center"
                  >
                    {page.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
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
                /*
                Let MUI style but render react-router-dom Link for it's
                functionality. MUI will forward the `to` prop to the RouterLink
                */
                component={RouterLink}
                to={page.path}
                onClick={() => {
                  handleCloseNavMenu();
                }}
                sx={{
                  color: 'primary',
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
