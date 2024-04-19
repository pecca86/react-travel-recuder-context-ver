
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCity } from '../../context/CityContext';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import styles from './styles/City.module.css';

const City = () => {

    const navigate = useNavigate();
    const { getCurrentCity, currentCity, isLoading, deleteCity } = useCity();
    const { cityId } = useParams();
    const { getUrlPosition } = useUrlPosition();
    const lat = getUrlPosition().lat;
    const lng = getUrlPosition().lng;

    useEffect(() => {
        getCurrentCity(cityId);
    }, [cityId, getCurrentCity]);

    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        deleteCity(cityId);
        navigate(-1);
    }


    return (
        <div className={styles.city_card}>
            <h1>{currentCity.emoji} {currentCity.cityName}</h1>
            <button onClick={e => handleDelete(e)} className={styles.remove_button}>Delete</button>
            <p className={styles.coordinates}>lat: {lat}, long: {lng}</p>
            <div className={styles.info_container}>
                <div className={styles.travel_date}>{`You visited ${currentCity.cityName} on ${currentCity.date}`}</div>
                <div className={styles.travel_notes_header}>Your travel notes 📒</div>
                <div className={styles.travel_notes}>{currentCity.notes}</div>
            </div>
            <button onClick={handleBack}>Back</button>
        </div>
    );
}

export default City;
