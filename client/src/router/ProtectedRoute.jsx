import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setLogoutTimer } from "../utils/setLogoutTimer";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((store) => store.user?.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) setLogoutTimer(dispatch, 10 * 1000);
    console.log(typeof children);
  }, [isAuthenticated]);

  return isAuthenticated ? children : <Navigate to='/auth/login' replace />;
};

export default ProtectedRoute;
