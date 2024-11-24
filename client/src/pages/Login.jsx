import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../redux/user";
import { setLogoutTimer } from "../utils/setLogoutTimer";

const Login = () => {
  const isAuthenticated = useSelector((store) => store.user?.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    dispatch(login({}));
    navigate("/dashboard");
  };

  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/dashboard' />
      ) : (
        <div>
          <h2>Login Page</h2>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </>
  );
};

export default Login;
