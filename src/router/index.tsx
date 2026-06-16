import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/shared/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddTask from "../pages/AddTask/AddTask";
import EditTask from "../pages/EditTask/EditTask";
import Categories from "../pages/Categories/Categories";
import History from "../pages/History/History";
import Settings from "../pages/Settings/Settings";

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
