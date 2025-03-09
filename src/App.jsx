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

const App = ({ location }) => {
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

  // Prevent scrolling on body when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

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
          <h1 className="sidebar-title">King James System Bible Study</h1>
          <hr />
          <h2 className="sidebar-subtitle">King James Bible</h2>
          <ul className="sidebar-list">
            {routes.map((route, index) => (
              <li key={index} className="sidebar-item">
                <Link
                  to={route.path}
                  className={`sidebar-link ${
                    route.path === '/Book/:bookName' 
                      ? location.pathname.startsWith('/Book/') 
                      : location.pathname === route.path 
                    ? 'active' 
                    : ''
                  }`}
                  onClick={handleLinkClick}
                >
                  {route.sidebar().props.children}
                </Link>
              </li>
            ))}
          </ul>
          <div className="sidebar-footer">
            <Link to="/donate" className="sidebar-link" onClick={handleLinkClick}>
              Support This Project
            </Link>
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