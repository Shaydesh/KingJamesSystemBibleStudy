import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { BookProvider } from "./BookContext";
import TableOfContents from "./pages/TableOfContents";
import BookMarks from "./pages/BookMarks";
import Book from "./pages/Book";
import OfflineStatus from "./pages/OfflineStatus";
import InstallPrompt from "./pages/InstallPrompt";

const routes = [
  {
    path: "/",
    sidebar: () => <div>Table of Contents</div>,
    main: () => <TableOfContents />,
  },
  {
    path: "/BookMarks",
    sidebar: () => <div>Bookmarks</div>,
    main: () => <BookMarks />,
  },
  {
    path: "/Book/:bookName",
    sidebar: () => <div>Book</div>,
    main: () => <Book />,
  },
];

const AppWrapper = () => {
  const location = useLocation();
  return <App location={location} />;
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="app-wrapper">
      <div className="header">
        <button onClick={toggleSidebar} className="hamburger-icon">
          &#9776; {/* Hamburger icon */}
        </button>
        <h1 className="app-title">System Bible Study</h1>
         <InstallPrompt />
      </div>

     

      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        >
          <h1 className="sidebar-title">King James Bible Study</h1>
          <hr />
          <div className="sidebar-menu">
            <h2 className="sidebar-subtitle">Navigation</h2>
            <ul className="sidebar-list">
              <li className="sidebar-item">
                <Link
                  to="/"
                  className="sidebar-link"
                  onClick={handleLinkClick}
                >
                  Bible Contents
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  to="/BookMarks"
                  className="sidebar-link"
                  onClick={handleLinkClick}
                >
                  My Bookmarks
                </Link>
              </li>
            </ul>
            
            <h2 className="sidebar-subtitle">About</h2>
            <div className="sidebar-info">
              <p>King James Version (KJV) Bible study tool</p>
              <p>With chapter navigation and bookmarking features</p>
            </div>
          </div>
        </div>
      )}

      <div className={`content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.main()} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

// Main App Component with Router
const MainApp = () => (
  <Router>
    <BookProvider>
      <AppWrapper />
    </BookProvider>
  </Router>
);

export default MainApp;
