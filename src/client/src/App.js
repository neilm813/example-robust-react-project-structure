import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';

import { theme } from 'theme';

const queryClient = new QueryClient();

function App() {
  /* 
  <Outlet /> here will render the child of the <Route element={<App />} />
  (see index.js) which in this case will be the <Layout /> which itself has
  children so the <Layout /> will also use <Outlet /> to render it's child
  component based on the current path.
  */
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/*
        Outlet is the rest of our app that is rendered which is wrapped with
        provider component's from packages to provide any of our components
        access to these tools.
        */}
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
