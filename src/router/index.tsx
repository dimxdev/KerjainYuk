/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/shared/Layout";

// Tiap halaman di-split jadi chunk terpisah; baru di-download saat route-nya dibuka.
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const AddTask = lazy(() => import("../pages/AddTask/AddTask"));
const EditTask = lazy(() => import("../pages/EditTask/EditTask"));
const Categories = lazy(() => import("../pages/Categories/Categories"));
const History = lazy(() => import("../pages/History/History"));
const Settings = lazy(() => import("../pages/Settings/Settings"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "add", element: <AddTask /> },
      { path: "edit/:id", element: <EditTask /> },
      { path: "categories", element: <Categories /> },
      { path: "history", element: <History /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);
