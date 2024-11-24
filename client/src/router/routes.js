import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import Payments from "../pages/Payments";
import Contact from "../pages/Contact";
import About from "../pages/About";
import RGPD from "../pages/RGPD";
import CGU from "../pages/CGU";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import React from "react";

export const pagesWithLayout = [
  {
    path: "/",
    element: Navigate,
    props: {
      to: "/dashboard",
      replace: true,
    },
  },
  {
    path: "dashboard",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Dashboard, { key: "dashboard" })],
    },
  },
  {
    path: "employees",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Employees, { key: "employees" })],
    },
  },
  {
    path: "payments",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Payments, { key: "payments" })],
    },
  },
  {
    path: "contact",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Contact, { key: "contact" })],
    },
  },
  {
    path: "about",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(About, { key: "about" })],
    },
  },
];

export const otherPages = [
  {
    path: "/auth/login",
    element: Login,
  },
  {
    path: "/rgpd",
    element: RGPD,
  },
  {
    path: "/cgu",
    element: CGU,
  },
  {
    path: "*",
    element: Navigate,
    props: {
      to: "/dashboard",
      replace: true,
    },
  },
  // {
  //   path: "*",
  //   element: NotFound,
  // },
];

// : [
//     {
//       path: "*",
//       element: React.createElement(Navigate, { to: "/auth/login" }),
//     },
//     {
//       path: "/auth/login",
//       element: React.createElement(Login),
//     },
//   ],
