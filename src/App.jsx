import React, { Children } from 'react'
import { ActivityLogPage } from './pages/activityLog/ActivityLogPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from './pages/activityLog/Layout';
import { ErrorPage } from './pages/errorPage/ErrorPage';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Layout/>,
      errorElement:<ErrorPage/>,
      Children:[
        {index:true, element: <DashboardPage/>},
        {
          path:"activityLog",
          element:<ActivityLogPage/>,
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}
export default App