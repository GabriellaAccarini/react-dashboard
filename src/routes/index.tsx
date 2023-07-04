import React from 'react';
//import AppRoutes from './app.routes';
import Auth from './auth.routes'
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import App from './app.routes';

const Routes: React.FC = () => {
    const { logged } = useAuth();
    return (
        <>
            {logged ? <App /> : <Auth />}
        </>

    )
}
export default Routes;