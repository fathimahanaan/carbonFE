import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../components/sidebar/SideBar'

export const Layout = () => {
  return (
       <div className="flex h-screen">
      <div className="hidden lg:block">
        <SideBar />
      </div>

      <div className="flex-1 p-5 mb-10 overflow-auto max-h-screen">
        <Outlet />
      </div>
    </div>
  )
}
