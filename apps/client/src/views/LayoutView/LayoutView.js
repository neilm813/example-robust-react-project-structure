import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { TopAppBar } from '../../components';

/**
 * A common layout and style to be consistently applied to the all child views.
 */
export const LayoutView = (_props) => (
  <Box>
    <TopAppBar />
    <Container sx={{ pt: 3 }}>
      {/*
        Outlet let's us choose where in this layout to render the active view 
      */}
      <Outlet />
    </Container>
  </Box>
);
