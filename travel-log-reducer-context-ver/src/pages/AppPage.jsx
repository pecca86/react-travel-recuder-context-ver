
import React from 'react';
import SideBar from '../components/app_components/SideBar';
import Map from '../components/app_components/Map';
import styles from './styles/AppPage.module.css';

const AppPage = () => {
    return (
        <div className={styles.app_page_main}>
            <SideBar />
            <Map />
        </div>
    );
}

export default AppPage;
