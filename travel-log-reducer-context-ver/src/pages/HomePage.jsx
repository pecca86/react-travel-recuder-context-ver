import { Link } from 'react-router-dom'
import PageNav from '../components/PageNav'
import styles from './styles/HomePage.module.css'
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const { isAuthenticated } = useAuth();
    return (
        <main>
            <PageNav />
            <div className={styles.hero_header}>
                <h1 className={styles.hero_heading}>You travel. We log.</h1>
                <p className={styles.hero_text}>Here you can log your travels to be able to visit your memories on a later date. You can log both your location which will be displayed on the map, and some fun anectodes from your trips 😍</p>
                <Link to={isAuthenticated ? '/app' : '/login'} className='cta_glass'>Start your journey</Link>
            </div>
        </main>
    )
}

export default HomePage