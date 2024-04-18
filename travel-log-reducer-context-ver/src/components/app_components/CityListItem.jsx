
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/CityListItem.module.css';
import { useCity } from '../../context/CityContext';

const CityListItem = ({ city }) => {
    const { currentCity } = useCity();

    return (
        <Link to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}>
            <li className={`${styles.city_list_item} ${city.id === currentCity.id ? styles.selected : ''}`}>
                <span>{city.emoji}</span>
                <span>{city.cityName}</span>
                <span className={styles.date}>{city.date}</span>
            </li>
        </Link>
    );
}

export default CityListItem;
