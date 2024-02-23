import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Importez useAuth si nécessaire

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isLogged, isAdmin } = useAuth(); // Supposons que useAuth fournit un moyen de vérifier si l'utilisateur est admin

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogged && isAdmin ? (
          <Element {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
