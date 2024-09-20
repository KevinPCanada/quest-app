import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { useState } from 'react'
import './App.css'


import Home from "./pages/Home/Home"
import Auth from "./pages/Auth/Auth"
import Landing from "./pages/Landing/Landing"
import Reward from "./pages/Reward/Reward"
import NotFound from "./pages/NotFound/NotFound"
import Settings from "./pages/Settings/Settings"
import NewQuest from './components/NewQuest/NewQuest';

import Sidebar from "./components/Sidebar/Sidebar"
import Privacy from './pages/Privacy/PrivacyPolicy';
import AboutUs from './pages/About/AboutUs';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout-outlet">
       <Outlet />
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/reward",
        element: <Reward />
      },
      {
        path: "/settings",
        element: <Settings />
      },
    ]

  },
  {
    path: "/auth",
    element: <Auth/>  ,
  },
  {
    path: "/landing",
    element: <Landing />  ,
  },
  {
    path: "*",
    element: <NotFound />  // Create a NotFound component for 404 errors
  },
  {
    path: "/privacy",
    element: <Privacy/>  ,
  },
  {
    path: "/about",
    element: <AboutUs/>  ,
  },
]);

function App() {

  return (
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App