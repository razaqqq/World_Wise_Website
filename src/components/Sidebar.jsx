
import styles from './Sidebar.module.css'
import Logo from './Logo.jsx'
import AppNav from './AppNav.jsx';
import SidebarFooter from './SidebarFooter.jsx';
import { Outlet } from 'react-router-dom';

function Sidebar(props) {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />

            <Outlet />

            <SidebarFooter styles={styles} />

        </div>
    );
}

export default Sidebar;