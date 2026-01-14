import React, { Children } from 'react'
import { ActivityLogPage } from './pages/activityLog/ActivityLogPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from './pages/errorPage/ErrorPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { SideBar } from './components/sidebar/SideBar';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <SideBar/>,
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