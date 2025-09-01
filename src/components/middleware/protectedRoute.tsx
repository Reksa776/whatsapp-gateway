import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children, role }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios
        .post('http://localhost:5000/login/protected', {}, {
          headers: { Authorization: token },
        })
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    } else {
      setIsAuthenticated(false);
    }
    loadRole();
  }, []);

  const loadRole = () => {
    const response = jwtDecode(token);
    setData(response)
  }

  if (isAuthenticated === null) return <div>Loading...</div>;

  if (isAuthenticated) {
    if (role && !role.includes(data.role)) {
      return <Navigate to="/dashboard" replace />; // Use Navigate instead of Redirect
    } else {
      return children;
    }
  } else {
    return <Navigate to="/" replace />
  }


};
