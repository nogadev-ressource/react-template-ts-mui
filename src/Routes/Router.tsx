import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from "../Pages/Home";
import Login from "../Auth/Login/Login";
import Guard from './Guard';
import ErrorPage from "../Pages/ErrorPage";
import Register from "../Auth/Register/Register";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Guard>
                <Home/>
            </Guard>
        ),
        errorElement: <ErrorPage/>
    },
    {
        path: '/login',
        element: <RedirectIfAuthenticated><Login/></RedirectIfAuthenticated>
    },
    {
        path: '/register',
        element: <RedirectIfAuthenticated><Register/></RedirectIfAuthenticated>
    },
    // This catch-all route is placed at the top level, ensuring it catches all undefined routes
    {
        path: '*',
        element: <ErrorPage/>
    }
]);
