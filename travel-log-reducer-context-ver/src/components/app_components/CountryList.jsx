import React from 'react';
import styles from './styles/CountryList.module.css';
import CountryListItem from './CountryListItem';
import { useCity } from '../../context/CityContext';

const CountyList = () => {

    const { cities, isLoading } = useCity();
    if (isLoading) return (<p>Loading...</p>);
    
    const countries = cities.reduce((acc, city) => {
        if (!acc.find(item => item.name === city.country)) {
            acc.push({
                id: city.id,
                name: city.country,
                flag: city.emoji
            });
        }
        return acc;
    }, []);

    return (
        <div className={styles.country_list}>
            {countries.map(c => (
                <CountryListItem key={c.id} name={c.name} flag={c.flag} />
            ))}
        </div>
    );
}

export default CountyList;
