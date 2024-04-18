
import React from 'react';
import styles from './styles/Login.module.css';
import PageNav from '../components/PageNav';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {

    const navigate = useNavigate();
    const { signIn, user, signOut, isAuthenticated } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        signIn(email, password);
    }

    const handleLogout = (e) => {
        e.preventDefault();
        signOut();
        navigate("/");
    }

    if (isAuthenticated) {
        return (
            <div>
                <PageNav />
                <div className={styles.login_container}>
                    <h1>Welcome {user.name}</h1>
                    <button onClick={e => handleLogout(e)} className={styles.login_button}>Sign Out</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <PageNav />
            <div className={styles.login_container}>
                <form action="" className={styles.login_form}>
                    <div className={styles.login_input_container}>
                        <label htmlFor="email" className={styles.login_label}>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className={styles.login_input} value={email} />
                    </div>
                    <div className={styles.login_input_container}>
                        <label htmlFor="password" className={styles.login_label}>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className={styles.login_input} value={password}/>
                    </div>
                    <button onClick={e => handleLogin(e)} className={styles.login_button}>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
