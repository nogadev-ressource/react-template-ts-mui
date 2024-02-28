import {createBrowserRouter} from 'react-router-dom';


import React from 'react';


import Home from "../Pages/Home";
import Login from "../Auth/Login/Login";
import Guard from './Guard';
import ErrorPage from "../Pages/ErrorPage";
import Register from "../Auth/Register/Register";

export const router = createBrowserRouter([
    {
        path: '/',

        element: (
            <Guard>
                <Home/>
            </Guard>
        ),
        errorElement: <ErrorPage/>,

        children: [


            {path: '*', element: <ErrorPage/>},
        ],
    },

    {path: '/login', element: <Login/>},
    {path: '/register', element: <Register/>},
    {path: '*', element: <ErrorPage/>},
]);
