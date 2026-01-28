import { RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../routes/routes";
import styles from "./Sidebar.module.css";

const Sidebar = ({
  isOpen,
  sidebarRef,
  onClose,
}: {
  isOpen: boolean;
  sidebarRef: RefObject<HTMLDivElement>;
  onClose: () => void;
}) => {
  const location = useLocation();

  const bibleRoutes = routes.filter(route => route.category === "bible");
  const calendarRoutes = routes.filter(route => route.category === "calendar");
  const mapRoutes = routes.filter(route => route.category === "map");
  const miracleRoutes = routes.filter(route => route.category === "miracles");

  return isOpen ? (
    <div ref={sidebarRef} className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarHeader}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>
        <h1 className={styles.sidebarTitle}>King James System Bible Study</h1>
      </div>

      <div className={styles.sidebarContent}>
        {/* Bible Section */}
        <h2 className={styles.sidebarSubtitle}>King James Bible</h2>
        <ul className={styles.sidebarList}>
          {bibleRoutes.map((route, index) => (
            <li key={index} className={styles.sidebarItem}>
              <Link
                to={route.path}
                className={`${styles.sidebarLink} ${(route.path === "/Book/:bookName" &&
                  location.pathname.startsWith("/Book/")) ||
                  location.pathname === route.path
                  ? `${styles.active}` : ""}`}
                onClick={onClose}
              >
                {route.path === "/Book/:bookName" ? <route.sidebar /> : route.sidebar().props.children}
              </Link>
            </li>
          ))}
        </ul>

        <hr />
        <h2 className={styles.sidebarSubtitle}>Biblical Chronology</h2>
        <ul className={styles.sidebarList}>
          {calendarRoutes.map((route, index) => (
            <li key={index} className={styles.sidebarItem}>
              <Link
                to={route.path}
                className={`${styles.sidebarLink} ${location.pathname === route.path ? `${styles.active}` : ""}`}
                onClick={onClose}
              >
                {route.sidebar().props.children}
              </Link>
            </li>
          ))}
        </ul>

        <hr />
        <h2 className={styles.sidebarSubtitle}>Miracles</h2>
        <ul className={styles.sidebarList}>
          {miracleRoutes.map((route, index) => (
            <li key={index} className={styles.sidebarItem}>
              <Link
                to={route.path}
                className={`${styles.sidebarLink} ${location.pathname === route.path ? `${styles.active}` : ""}`}
                onClick={onClose}
              >
                {route.sidebar().props.children}
              </Link>
            </li>
          ))}
        </ul>



        <hr />
        <h2 className={styles.sidebarSubtitle}>Map</h2>
        <ul className={styles.sidebarList}>
          {mapRoutes.map((route, index) => (
            <li key={index} className={styles.sidebarItem}>
              <Link
                to={route.path}
                className={`${styles.sidebarLink} ${location.pathname === route.path ? `${styles.active}` : ""}`}
                onClick={onClose}
              >
                {route.sidebar().props.children}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.sidebarFooter}>
        <Link
          to="/donate"
          className={`${styles.sidebarLink} ${location.pathname === "/donate" ? styles.active : ""}`}
          onClick={onClose}
        >
          Support This Project
        </Link>
      </div>
    </div>
  ) : null;
};


export default Sidebar;
