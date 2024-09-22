

import Map from '../components/Map.jsx';
import Sidebar from '../components/Sidebar.jsx';
import User from '../components/User.jsx';

import styles from './AppLayout.module.css'

function AppLayout() {
    return (
        <div
            className={styles.app}
        >
            <Sidebar />
            <Map />
            <User />
        </div>
    );
}

export default AppLayout;