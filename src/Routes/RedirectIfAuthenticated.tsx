import React, {ReactNode} from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
interface ProtectedRouteProps {
    children: ReactNode;
}
const RedirectIfAuthenticated: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = !!Cookies.get('AUTH_USER');

    if (isAuthenticated) {
        return <Navigate to="/" replace />; // Redirige vers la page d'accueil si authentifié
    }

    return <>{children}</>; // Sinon, affiche les enfants (la page de connexion, dans ce cas)
};

export default RedirectIfAuthenticated;
