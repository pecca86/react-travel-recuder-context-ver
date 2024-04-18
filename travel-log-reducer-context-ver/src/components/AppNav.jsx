
import React from 'react';
import styles from './styles/AppNav.module.css';
import { NavLink } from 'react-router-dom';

const AppNav = () => {
    return (
        <nav className={styles.nav}>
            <NavLink to='/' className={styles.nav_link}>Home</NavLink>
            <NavLink to='cities' className={styles.nav_link}>Cities</NavLink>
            <NavLink to='countries' className={styles.nav_link}>Countries</NavLink>
        </nav>
    );
}

export default AppNav;
