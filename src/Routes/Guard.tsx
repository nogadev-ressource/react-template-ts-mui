import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";
//import Cookies from 'js-cookie';

interface ProtectedRouteProps {
      children: ReactNode;
}

const Guard: React.FC<ProtectedRouteProps> = ({ children }) => {
      const isAuthenticated = !!Cookies.get('AUTH_USER');

      if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
      }

      return <>{children}</>;
};

export default Guard;
