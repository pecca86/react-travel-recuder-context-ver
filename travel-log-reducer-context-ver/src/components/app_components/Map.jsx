import React from 'react';
import styles from './styles/Map.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, LayersControl, LayerGroup, Circle, FeatureGroup, Rectangle } from 'react-leaflet';
import { useCity } from '../../context/CityContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useUrlPosition } from '../../hooks/useUrlPosition';

const Map = () => {
    const { isLoading, position, getPosition } = useGeolocation();
    const { cities } = useCity();
    const { getUrlPosition } = useUrlPosition();
    const lat = getUrlPosition().lat;
    const lng = getUrlPosition().lng;
    const [currentPosition, setCurrentPosition] = useState([lat || 51.505, lng || -0.09]);

    useEffect(
        function () {
            if (lat && lng) setCurrentPosition([lat, lng]);
        },
        [lat, lng]
    );

    useEffect(() => {
        if (position) setCurrentPosition([position.lat, position.lng]);
    }, [getPosition])

    if (!cities) {
        return <p>Loading...</p>
    }

    return (
        // <div className={styles.map_container} onClick={() => { navigate("form") }}>
        <div className={styles.map_container}>
            <button className={styles.geo_btn} onClick={getPosition}>{isLoading ? "Loading..." : "Use your position"}</button>
            <MapContainer className={styles.map} center={currentPosition} zoom={6} scrollWheelZoom={true}>
                <LayersControl position="topright">
                    <LayersControl.Overlay name="Marker with popup" checked={true}>
                        <Marker position={currentPosition}>π /
                            <Popup>
                                Did you visit this place?
                            </Popup>
                        </Marker>
                    </LayersControl.Overlay>
                </LayersControl>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map(city => (
                    <Marker key={city.id} position={city.position}>
                        <Popup>
                            {city.cityName}
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={currentPosition} />
                <GetCoordinates />
            </MapContainer>
        </div>

    );
}

const ChangeCenter = ({ position }) => {
    const map = useMap()
    map.setView(position)
    return null;
}

const GetCoordinates = () => {
    const navigate = useNavigate();

    useMapEvents({
        click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}

export default Map;
