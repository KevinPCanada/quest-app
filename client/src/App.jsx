import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthContextProvider } from '/src/context/AuthContext';
import { Toaster } from "./components/ui/toaster";
import { ToastProvider } from "./components/ui/toast";

import "./App.css";

import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Auth2 from "./pages/AuthPage/AuthPage";
import Landing from "./pages/Landing/Landing";
import Reward from "./pages/Reward/Reward";
import NotFound from "./pages/NotFound/NotFound";
import Settings from "./pages/Settings/Settings";
import NewQuest from "./components/NewQuest/NewQuest";
import Sidebar from "./components/Sidebar/Sidebar";
import Privacy from './pages/Privacy/PrivacyPolicy';
import AboutUs from './pages/About/AboutUs';
import QuestHistory from './pages/QuestHistory/QuestHistory';

// New: Import the ProtectedRoute component
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'; // <-- New code
import AuthPage from "./pages/AuthPage/AuthPage";

const Layout = () => {
  return ( 
    <div className="layout">
      <Sidebar />
      <div className="layout-outlet">
        <Outlet />
      </div>
    </div>
  );
};

// AuthWrapper provides authentication context to the app
const AuthWrapper = ({ children }) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthWrapper>
        {/* New: Wrap the Layout in ProtectedRoute to protect the inner routes */}
        <ProtectedRoute> {/* <-- auth code */}
          <Layout />
        </ProtectedRoute> {/* <-- auth code */}
      </AuthWrapper>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/reward",
        element: <Reward />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/questhistory",
        element: <QuestHistory />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <AuthWrapper>
        <AuthPage />
      </AuthWrapper>
    ),
  },
  // {
  //   path: "/auth2",
  //   element: (
  //     <AuthWrapper>
  //       <Auth2 />
  //     </AuthWrapper>
  //   ),
  // },
  {
    path: "/landing",
    element: (
      <AuthWrapper>
        <Landing />
      </AuthWrapper>
    ),
  },
  {
    path: "*",
    element: (
      <AuthWrapper>
        <NotFound />
      </AuthWrapper>
    ),
  },
]);

function App() {
  return (
    <ToastProvider>
      <div className="app">
        <div className="app-container">
          <RouterProvider router={router} />
        </div>
      </div>
      <Toaster />
    </ToastProvider>
  );
}

export default App;
