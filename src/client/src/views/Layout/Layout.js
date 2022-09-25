import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import { TopAppBar } from '../../components';

/**
 * A common layout and style to be consistently applied to the all child views.
 */
export const Layout = (_props) => (
  <Box>
    <TopAppBar />
    {/*
      Outlet will be the view component that's matched based on the path from the
      views nested inside the Layout <Route> in index.js

      This let's us choose where in the Layout to render the active view.
      */}
    <Container sx={{ pt: 3 }}>
      <Outlet />
    </Container>
  </Box>
);
