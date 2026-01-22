import React from 'react'
import { ActivityLogPage } from './pages/activityLog/ActivityLogPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from './pages/errorPage/ErrorPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { Layout } from './pages/Layout';
import LoginPage from './pages/login/LoginPage';
 
import HistoryPage from './pages/history/HistoryPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [   
        { index: true, element: <DashboardPage /> },
        { path: "activity", element: <ActivityLogPage /> },
           { path: "history", element: <HistoryPage/> },
      ],
    },
     {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
  

  return <RouterProvider router={router} />;
}

export default App;
