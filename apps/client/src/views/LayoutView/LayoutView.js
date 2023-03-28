import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { TopAppBar } from '../../components';

/**
 * When the url matches the path of a view that is nested inside of the LayoutView route in index.js, it will be
 * rendered where `<Outlet />` is placed so that those nested views all
 */
export const LayoutView = (_props) => (
  <Box>
    <TopAppBar />
    <Container sx={{ pt: 3 }}>
      <Outlet />
    </Container>
  </Box>
);
