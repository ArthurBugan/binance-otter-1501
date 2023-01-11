import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./store";
import { Provider } from "react-redux";

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { dark, light } from "./theme";

const query = new URLSearchParams(location.search);
const useTheme = query.get("theme") || "dark";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/en/trade/BTC_BUSD" replace />,
  },
  {
    path: "en/trade/:pair",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={useTheme === "dark" ? dark : light}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
