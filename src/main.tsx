import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { dark, light } from "./theme";

const query = new URLSearchParams(location.search);
const useTheme = query.get("theme") || "dark";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={useTheme === "dark" ? dark : light}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/en/trade/:pair" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
