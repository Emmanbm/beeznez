import { Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Payments from "../pages/Payments";
import Contact from "../pages/Contact";
import About from "../pages/manager/About";
import RGPD from "../pages/RGPD";
import CGU from "../pages/CGU";
import Login from "../pages/Login";
import React from "react";
import Employees from "../pages/manager/Employees";
import Users from "../pages/admin/Users";
import Companies from "../pages/admin/Companies";
import CreateAdmin from "../pages/admin/CreateAdmin";
import TakeALeave from "../pages/TakeALeave";
import ContactAFreelance from "../pages/ContactAFreelance";
import Messages from "../pages/Messages";
import Leaves from "../pages/manager/Leaves";
import Tasks from "../pages/Tasks";
import JoinACompany from "../pages/employees/JoinACompany";
import Projects from "../pages/manager/Projects";
import SignUp from "../pages/SignUp";
import Blog from "../pages/Blog";
import NotFound from "../pages/NotFound";
import RegisterUser from "../pages/RegisterUser";
import RegisterCompany from "../pages/RegisterCompany";
import RegisterUserAndCompany from "../pages/RegisterUserAndCompany";

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
      children: [React.createElement(Employees, { key: "employees" })],
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
  {
    path: "about",
    element: ProtectedRoute,
    props: {
      children: [React.createElement(About, { key: "about" })],
      allowedRoles: ["admin", "manager"],
    },
  },
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
  {
    path: "/",
    element: Navigate,
    props: {
      to: "/blog",
      replace: true,
    },
  },
  {
    path: "/blog",
    element: Blog,
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
    path: "/rgpd",
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
