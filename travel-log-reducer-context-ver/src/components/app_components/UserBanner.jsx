
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './styles/UserBanner.module.css';
import { useNavigate } from 'react-router-dom';

const UserBanner = () => {
    const {user, signOut, isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        signOut();
        navigate("/");
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className={styles.user_banner}>
            {/* create a layout for a small floating bar displaying the user name and a logout button */}
            {/* the bar should be displayed on the top right corner of the page */}
            <div className={styles.username}>Welcome, {user.name}</div>
            <div>
                <button onClick={e => handleLogout(e)} className={styles.logout_btn}>Logout</button>
            </div>
        </div>
    );
}

export default UserBanner;
