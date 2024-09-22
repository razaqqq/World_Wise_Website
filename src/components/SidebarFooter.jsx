import React from 'react';


function SidebarFooter({
    styles
}) {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>
                &copy; Copyright {new Date().getFullYear()} by WorlWise Inc.
            </p>
        </footer>
    );
}

export default SidebarFooter;