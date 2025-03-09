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
  const location = useLocation();

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

  const location = useLocation();

  // Map routes to icons
  const getRouteIcon = (path) => {
    switch(path) {
      case "/":
        return "📚"; // Table of Contents icon
      case "/BookMarks":
        return "🔖"; // Bookmarks icon
      case "/Book/:bookName":
        return "📖"; // Book icon
      default:
        return "📄"; // Default icon
    }
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

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className={`sidebar-overlay ${isSidebarOpen ? "show" : ""}`}
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "open" : ""}`}
      >
        <div className="sidebar-header">
          <h1 className="sidebar-title">King James Bible</h1>
          <button className="close-sidebar" onClick={toggleSidebar}>×</button>
        </div>
        <hr />
        <h2 className="sidebar-subtitle">Navigation</h2>
        <ul className="sidebar-list">
          {routes.map((route, index) => {
            const isActive = location.pathname === route.path || 
              (route.path.includes(':') && location.pathname.includes(route.path.split('/:')[0]));
            
            return (
              <li key={index} className={`sidebar-item ${isActive ? "active" : ""}`}>
                <Link
                  to={route.path}
                  className={`sidebar-link ${isActive ? "active" : ""}`}
                  onClick={handleLinkClick}
                >
                  <span className="sidebar-link-icon">{getRouteIcon(route.path)}</span>
                  {route.sidebar().props.children}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

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
