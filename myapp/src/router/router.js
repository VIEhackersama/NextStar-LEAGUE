import React from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
const Routers = () => {
  const location = useLocation(); 
  return (
    <AnimatePresence mode="wait">
    <Routes location={location} key={location.pathname}>
    </Routes>
    </AnimatePresence>
  );
};