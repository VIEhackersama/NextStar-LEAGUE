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
import NewsPage from '../pages/newPage';
import NewsDetailPage from '../pages/NewsDetailPage';
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ContactPage from "../pages/ContactPage";


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
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:id" element={<NewsDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </AnimatePresence>
    );
};

export default Routers;