import React from "react";
import { ActivityLogPage } from "./pages/activityLog/ActivityLogPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/errorPage/ErrorPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { Layout } from "./pages/Layout";
import LoginPage from "./pages/login/LoginPage";
import HistoryPage from "./pages/history/HistoryPage";
import { ResourcePage } from "./pages/resources/ResourcePage";
import { AddResourcePage } from "./pages/resources/AddResourcePage";
import { EditResourcePage } from "./pages/resources/EditResourcePage";

import AdminRoute from "./components/admin/AdminRoute";
import PrivateRoute from "./context/PrivateRoute";
import GetEmissionGraph from "./components/insights/GetEmissionGraph";
 

function App() {
const router = createBrowserRouter([
  {
    element: <PrivateRoute />,   
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "activity", element: <ActivityLogPage /> },
          { path: "history", element: <HistoryPage /> },
          { path: "resources", element:<GetEmissionGraph/>  },
 

          {
            element: <AdminRoute />, // protects admin routes
            children: [
              { path: "resources/add", element: <AddResourcePage /> },
              { path: "resources/edit/:id", element: <EditResourcePage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
]);

  return <RouterProvider router={router} />;
}

export default App;
