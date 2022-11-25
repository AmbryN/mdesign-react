import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import "../src/assets/styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Home, Events, Addresses, Types } from "./views";
import Header from "./components/layout/Header/Header.jsx";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/addresses" element={<Addresses />} />
          <Route path="/types" element={<Types />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </QueryClientProvider>
);
