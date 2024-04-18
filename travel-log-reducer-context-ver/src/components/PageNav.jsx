import { NavLink } from 'react-router-dom';
import styles from './styles/PageNav.module.css';

const PageNav = ({ page, setPage }) => {
    return (
        <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li>
                    <NavLink to='/' className={styles.nav_link}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/products' className={styles.nav_link}>Products</NavLink>
                </li>
                <li>
                    <NavLink to='/pricing' className={styles.nav_link}>Pricing</NavLink>
                </li>
                <li>
                    <NavLink to='/login' className={styles.nav_link}>Login</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default PageNav;