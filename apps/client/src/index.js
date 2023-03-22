import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// https://reactrouter.com/docs/en/v6/getting-started/overview#configuring-routes
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import { App } from './App';
import { Destinations, Layout, Home, NotFound, OneDestination, NewDestination } from './views';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/*
        Nested routes have their paths concatenated to their parent's
        to avoid repeating path sections. So every route nested inside
        the below one will start with '/'
        */}
        <Route path="/" element={<App />}>
          {/*
          The Layout will always be rendered since it has no path.

          Any view nested in the Layout route will be rendered as a child
          of the Layout component so all child views of the Layout are
          consistently laid out on the page based on where the Layout places
          the <Outlet />.
          */}
          <Route element={<Layout />}>
            {/* '/' with nothing after will render the index element */}
            <Route index element={<Home />} />
            <Route path="destinations">
              {/* when nothing is added after destination this index is used. */}
              <Route index element={<Destinations />} />
              {/* Concatenated path: /destinations/new */}
              <Route path="new" element={<NewDestination />} />
              <Route path=":id" element={<OneDestination />} />
            </Route>

            {/* Display this component if route doesn't match any above. */}
            <Route path="*" element={<NotFound />} />
            {/* Redirect if route doesn't match any above. */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
