import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .post('http://localhost:5000/login/protected', {},{
          headers: { Authorization: token },
        })
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ?  <Navigate to="/dashboard" replace />: children; // Use Navigate instead of Redirect
};
