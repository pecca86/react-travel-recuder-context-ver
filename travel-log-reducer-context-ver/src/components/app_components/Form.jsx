import React from 'react';
import styles from './styles/Form.module.css';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../../hooks/useUrlPosition';
import { useEffect, useState } from 'react';
import { useCity } from '../../context/CityContext';


const Form = () => {
    const navigate = useNavigate();
    const { getUrlPosition } = useUrlPosition();
    const [lat, lng] = [getUrlPosition().lat, getUrlPosition().lng];
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const [emoji, setEmoji] = useState('');
    const [error, setError] = useState(false);
    const [isLoadingCity, setIsLoadingCity] = useState(false);
    const { addCity } = useCity();

    useEffect(() => {
        if (!lat && !lng) {
            setError(true);
            return;
        };

        const fetchCity = async () => {
            try {
                setError(false);
                setIsLoadingCity(true);
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
                const data = await response.json();
                if (!data.city) {
                    throw new Error("That doesn't seem to be a city. Click somewhere else 😉");
                }
                setCity(city => data.city);
                setCountry(country => data.countryName);
                setEmoji(emoji => String.fromCodePoint(...data.countryCode
                    .toUpperCase()
                    .split('')
                    .map(char => 127397 + char.charCodeAt()))
                );
            } catch (error) {
                setError(true);
            } finally {
                setIsLoadingCity(false);
            }
        }
        fetchCity();
    }, [lat, lng]);

    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const cityData = {
            cityName: city,
            country: country,
            date: date,
            notes: notes,
            emoji: emoji,
            position: {
                lat: lat,
                lng: lng
            }
        }
        addCity(cityData);

        setCity('');
        setCountry('');
        setDate('');
        setEmoji('');
        setNotes('');
    }

    if (error) {
        return (
            <div>
                <p>That doesn't seem to be a city. Click somewhere else 😉</p>
                <button onClick={handleBack}>Back</button>
            </div>
        );
    }

    if (isLoadingCity) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }


    return (
        <div>
            <form className={styles.form}>
                <label htmlFor="city">City</label>
                <input className={styles.input} type="text" id="city" name="city" value={city + ' ' + emoji} readOnly={true} />

                <label htmlFor="date">Date</label>
                <input onChange={e => setDate(date => e.target.value)} className={styles.input} type="date" id="date" name="date" value={date} />

                <label htmlFor="notes">Notes</label>
                <textarea onChange={e => setNotes(e.target.value)} className={styles.input} name="notes" id="notes" cols="20" rows="5" value={notes}></textarea>
                <div className={styles.btns}>
                    <button onClick={e => handleSubmit(e)} type="submit">Submit</button>
                    <button onClick={handleBack}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default Form;
