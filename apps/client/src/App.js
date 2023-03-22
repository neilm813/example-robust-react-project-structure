import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { theme } from './theme';

const queryClient = new QueryClient();

/*
<Outlet /> here will render the child of the <Route element={<App />} />
(see index.js) which in this case will be the <Layout /> which itself has
children so the <Layout /> will also use <Outlet /> to render it's child
component based on the current path.
*/
export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/*
      <Outlet /> will render the routed-to-component based on the url.
      See index.js: <App /> will always render since it has no path,
      then the <Outlet /> in App.js will render active child route inside the
      App route, which will be the <Layout /> which in turn will render it's
      active child route component based on the url using <Outlet /> again.
      */}
      <Outlet />
    </ThemeProvider>
  </QueryClientProvider>
);
