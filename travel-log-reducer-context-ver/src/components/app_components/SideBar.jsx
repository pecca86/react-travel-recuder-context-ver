import React from 'react';
import styles from './styles/SideBar.module.css';
import AppNav from '../AppNav';
import UserBanner from './UserBanner';
import { Outlet } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className={styles.sidebar}>
            <h1>Start exploring ✈️</h1>
            <UserBanner />
            <AppNav />
            <Outlet />
        </div>
    );
}

export default SideBar;
