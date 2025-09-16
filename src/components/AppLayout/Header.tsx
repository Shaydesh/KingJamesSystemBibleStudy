import InstallPrompt from "../../pages/InstallPrompt";
import styles from "./Header.module.css";

const Header = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => (
  <div className={styles.header}>
    <button onClick={onToggleSidebar} className={styles.hamburgerIcon}>
      &#9776;
    </button>
    <h1 className={styles.appTitle}>System Bible Study</h1>
    <InstallPrompt />
  </div>
);

export default Header;
