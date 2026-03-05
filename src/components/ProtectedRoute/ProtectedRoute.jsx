import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { propTypes } from 'prop-types';

export function ProtectedRoute({ children, isAllowedRoles = null }) {
  const { user, loadingUser } = useAuth();

  if (loadingUser) {
    return null;
  }

  if (!user) {
    console.log('User not authenticated. Redirecting to login.');
    return <Navigate to="/" />;
  }

  if (isAllowedRoles && !isAllowedRoles.includes(user.role)) {
    console.log('Access denied. User role:', user.role);
    return <Navigate to="/" />;
  }

  return children;
}

// ProtectedRoute.propTypes = {
//     children: propTypes.node.isRequired,
// }