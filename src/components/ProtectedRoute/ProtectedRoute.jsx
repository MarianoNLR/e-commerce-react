import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';
import { propTypes } from 'prop-types';

export function ProtectedRoute({ children, isAllowedRoles = null }) {
  const { user, sessionStatus } = useAuth();

  // The cached user is not enough here: wait until the server confirms the session.
  if (sessionStatus === 'checking') {
    return <section className="admin-page-status" role="status">Verificando sesión…</section>;
  }

  if (!user || sessionStatus !== 'verified') {
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