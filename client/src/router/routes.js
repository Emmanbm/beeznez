import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Payments from "../pages/Payments";
import Contact from "../pages/Contact";
// import About from "../pages/manager/About";
import RGPD from "../pages/RGPD";
import CGU from "../pages/CGU";
import Login from "../pages/Login";
import React from "react";
import Companies from "../pages/admin/Companies";
import CreateAdmin from "../pages/admin/CreateAdmin";
import TakeALeave from "../pages/TakeALeave";
import ContactAFreelance from "../pages/ContactAFreelance";
import Messages from "../pages/Messages";
import Leaves from "../pages/manager/Leaves";
import Tasks from "../pages/Tasks";
import JoinACompany from "../pages/JoinACompany";
import Projects from "../pages/Projects";
import SignUp from "../pages/SignUp";
import Blog from "../pages/Blog";
import NotFound from "../pages/NotFound";
import RegisterUser from "../pages/RegisterUser";
import RegisterCompany from "../pages/RegisterCompany";
import RegisterUserAndCompany from "../pages/RegisterUserAndCompany";
import PaymentResult from "../pages/PaymentResult";
import Users from "../pages/Users";
import About from "../pages/About";

export const pagesWithLayout = [
  {
    path: "dashboard",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Dashboard, { key: "dashboard" })],
    },
  },
  {
    path: "take/a/leave",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(TakeALeave, { key: "take/a/leave" })],
    },
  },
  {
    path: "contact/a/freelance",
    element: ProtectedRoute,
    props: {
      children: [
        React.createElement(ContactAFreelance, { key: "contact/a/freelance" }),
      ],
    },
  },
  {
    path: "messages",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Messages, { key: "messages" })],
    },
  },
  {
    path: "users",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Users, { key: "users" })],
      allowedRoles: ["admin"],
    },
  },
  {
    path: "companies",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Companies, { key: "companies" })],
      allowedRoles: ["admin"],
    },
  },
  {
    path: "create/admin",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(CreateAdmin, { key: "create/admin" })],
      allowedRoles: ["admin"],
    },
  },
  {
    path: "employees",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Users, { key: "employees" })],
      allowedRoles: ["manager", "admin"],
    },
  },
  {
    path: "projects",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Projects, { key: "projects" })],
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
    path: "payments/:paymentMethod/:result",
    element: ProtectedRoute,
    props: {
      children: [
        React.createElement(PaymentResult, { key: "payments/:result" }),
      ],
    },
  },
  {
    path: "leaves",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Leaves, { key: "leaves" })],
      allowedRoles: ["manager", "admin"],
    },
  },
  {
    path: "tasks",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(Tasks, { key: "tasks" })],
    },
  },
  // {
  //   path: "about",
  //   element: ProtectedRoute,
  //   props: {
  //     children: [React.createElement(About, { key: "about" })],
  //     allowedRoles: ["admin", "manager"],
  //   },
  // },
  {
    path: "join/a/company",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(JoinACompany, { key: "join/a/company" })],
      allowedRoles: ["admin", "manager", "freelance"],
    },
  },
];

export const otherPages = [
  // {
  //   path: "/",
  //   element: Navigate,
  //   props: {
  //     to: "/blog",
  //     replace: true,
  //   },
  // },
  {
    path: "/",
    element: Blog,
  },
  {
    path: "/blog",
    element: Blog,
  },
  {
    path: "/about",
    element: About,
  },
  {
    path: "/login",
    element: Login,
  },
  {
    path: "/signup",
    element: SignUp,
  },
  {
    path: "/register/user",
    element: RegisterUser,
  },
  {
    path: "/register/company",
    element: RegisterCompany,
  },
  {
    path: "/register/user-and-company",
    element: RegisterUserAndCompany,
  },
  {
    path: "/contact",
    element: Contact,
  },
  {
    path: "/privacy-policy",
    element: RGPD,
  },
  {
    path: "/cgu",
    element: CGU,
  },
  {
    path: "*",
    element: NotFound,
  },
];
