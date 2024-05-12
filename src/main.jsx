import React from "react";
import ReactDOM from "react-dom/client";

import Register from "./pages/register/Register";
import Display from "./pages/Display.jsx";
import Browse from "./pages/Browse.jsx";
import Movies from "./pages/Movies.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/display",
    element: <Display />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
