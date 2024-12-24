import { createBrowserRouter } from "react-router-dom";
import React from "react";
import CustomLayout from "../pages/CustomLayout";
import { otherPages, pagesWithLayout } from "./routes";

const router = createBrowserRouter(
  [
    {
      path: "/auth/",
      element: React.createElement(CustomLayout),
      children: pagesWithLayout.map(({ element, props, ...otherProps }) => ({
        element: React.createElement(element, props),
        ...otherProps,
      })),
    },
    ...otherPages.map(({ element, props, ...otherProps }) => ({
      element: React.createElement(element, props),
      ...otherProps,
    })),
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
      v7_startTransition: true,
    },
  }
);

export default router;
