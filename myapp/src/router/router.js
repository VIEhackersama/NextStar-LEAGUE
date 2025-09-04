// src/routers/Routers.js
import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import Homepage from "../pages/homepage";
import TeamDetail from "../pages/TeamDetail";
import Header from "../components/header";
import HistoryPage from "../pages/HistoryPage";   
import ClubsPage from "../pages/ClubsPage";     
import StarsPage from "../pages/StarsPage"; 

const Routers = () => {
const location = useLocation(); 
return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
    <Route path="/" element={<Navigate to="/home" replace />} />
    <Route path="/home" element={<Homepage />} />
    <Route path="/team/:teamId" element={<TeamDetail />} /> 
    <Route path="/history" element={<HistoryPage />} />
    <Route path="/clubs" element={<ClubsPage />} />
    <Route path="/stars" element={<StarsPage />} />
    </Routes>
    </AnimatePresence>
);
};

export default Routers;