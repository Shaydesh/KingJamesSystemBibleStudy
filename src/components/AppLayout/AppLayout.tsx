import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../../routes/routes";
import styles from "./AppLayout.module.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const handleCloseSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSidebarOpen]);

  return (
    <div>
      <Header onToggleSidebar={toggleSidebar} />
      <Sidebar
        isOpen={isSidebarOpen}
        sidebarRef={sidebarRef}
        onClose={handleCloseSidebar}
      />
      <div className={`${styles.content} ${isSidebarOpen ? `${styles.sidebarOpen}` : ""}`}>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.main()} />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default AppLayout;
