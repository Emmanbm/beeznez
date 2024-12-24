import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setLogoutTimer } from "../utils/setLogoutTimer";
import { getExpirationTime } from "../utils/getExpirationTime";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, role } = useSelector((store) => store.user || {});
  useEffect(() => {
    if (isAuthenticated) setLogoutTimer(getExpirationTime({ h: 24 }));
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to='/dashboard' replace />;
  }

  return children;
};

export default ProtectedRoute;
