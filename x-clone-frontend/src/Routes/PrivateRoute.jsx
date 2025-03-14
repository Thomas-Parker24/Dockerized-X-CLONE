import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { LogInContext } from '../LogIn/Context';

export const PrivateRouter = ({ children }) => {
  const authContext = useContext(LogInContext);
  const { logged } = authContext;

  return logged ? children : <Navigate to="/login" />;
};
