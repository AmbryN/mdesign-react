import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from 'react-query/devtools'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider
} from "react-query";
import "../src/assets/styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./views/Home/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header/Header.jsx";
import Events from "./views/Events/Events.jsx";
import Addresses from "./views/Addresses/Addresses.jsx";

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
                </Routes>
            </Router>
        </React.StrictMode>
    </QueryClientProvider>
);
