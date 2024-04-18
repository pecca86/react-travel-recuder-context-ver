import React from 'react';
import styles from './styles/CityList.module.css';
import CityListItem from './CityListItem';
import { useCity } from '../../context/CityContext';

const CityList = () => {
    const { cities, isLoading } = useCity();
    if (isLoading) return (<p>Loading...</p>);

    if (cities.length === 0) return (<p>No cities added yet. Time to go travel! 💼</p>);

    return (
        <div className={styles.city_list}>
            {cities.map(city => (
                <CityListItem key={city.id} city={city} />
            ))}
        </div>
    );
}

export default CityList;
