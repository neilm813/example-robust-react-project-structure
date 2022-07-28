import { Outlet } from "react-router-dom";

/**
 * A common layout and style to be consistently applied to the all child views.
 * @param {*} _props
 */
export const Layout = (_props) => {
  return (
    <div>
      <nav>Navbar from layout</nav>
      {/*
      Outlet will be the view component that's matched based on the path from the
      views nested inside the Layout <Route> in index.js

      This let's us choose where in the Layout to render the active view.
      */}
      <Outlet />
    </div>
  );
};
