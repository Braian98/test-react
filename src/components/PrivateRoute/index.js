import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { checkExpiredToken } from '../../utils';

const PrivateRoute = ({ children, ...props }) => (
  // lo que hace este componente es fijarse si hay un token y que no esté expirado para poder mostrar la sección de productos, de lo contrario lo redirige al login
  <Route
    {...props}
    render={ () => localStorage.getItem('token') && checkExpiredToken() ? children : <Redirect to="/login" /> }
  />
);

export default PrivateRoute;