import React from "react";
import ReactDOM from "react-dom/client";
import "../src/assets/styles/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./views/Home/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Events from "./views/Events/Events";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/events" element={<Events/>}/>
            </Routes>
        </Router>
    </React.StrictMode>
);
