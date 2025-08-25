import React from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import Homepage from "../pages/homepage";
const Routers = () => {
  const location = useLocation(); 
  return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Homepage />} />
    </Routes>
    </AnimatePresence>
  );
};