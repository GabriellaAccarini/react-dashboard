import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import Layout from '../components/Layout';

const AppRoutes: React.FC = () => (
    <Layout>
        <BrowserRouter>
            <Routes>
                <Route Component={Dashboard} path="/" />
                <Route Component={List} path="/list/:type" />
            </Routes>
        </BrowserRouter>
    </Layout>
);

export default AppRoutes;