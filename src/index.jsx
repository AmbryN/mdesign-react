import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";

import "../src/assets/styles/style.css";
import {Query, Events, Addresses, Types, Event, Home, Login} from "./views";
import Header from "@components/layout/Header/Header.tsx";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false}/>
        <React.StrictMode>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/query" element={<Query/>}/>
                    <Route path="/events" element={<Events/>}/>
                    <Route path="/events/:id" element={<Event/>}/>
                    <Route path="/addresses" element={<Addresses/>}/>
                    <Route path="/types" element={<Types/>}/>
                </Routes>
            </Router>
        </React.StrictMode>
    </QueryClientProvider>
);