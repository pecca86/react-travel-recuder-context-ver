import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { reducer } from "../reducer/reducer";

const CityContext = createContext();


const CityProvider = ({ children }) => {
    
    const initialState = {
        cities: [],
        isLoading: false,
        currentCity: {}
    }

    const [{ cities, loading, currentCity }, dispatch] = useReducer(reducer, initialState);
    
    useEffect(() => {
        const fetchCities = async () => {
            dispatch({ type: "LOADING" })
            const response = await fetch('http://localhost:8000/cities')
            const data = await response.json()
            dispatch({ type: "CITITES_LOADED", payload: data })
        }
        fetchCities()
    }, [])

    const getCurrentCity = useCallback(async (cityId) => {
        dispatch({ type: "LOADING" })
        const found = cities.find(city => city.id === cityId)
        dispatch({ type: "CURRENT_CITY", payload: found })
    }, [currentCity.id]);

    const addCity = async (city) => {
        const response = await fetch('http://localhost:8000/cities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(city)
        })
        const data = await response.json()
        dispatch({ type: "CITY_CREATED", payload: data })
    };

    const deleteCity = async (cityId) => {
        const response = await fetch(`http://localhost:8000/cities/${cityId}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        dispatch({ type: "CITY_DELETED", payload: cityId })
    };

    return (
        <CityContext.Provider value={{
            cities: cities,
            isLoading: loading,
            currentCity: currentCity,
            getCurrentCity: getCurrentCity,
            addCity: addCity,
            deleteCity: deleteCity
        }}>
            {children}
        </CityContext.Provider>
    );
}

const useCity = () => {
    const context = useContext(CityContext);
    if (context === undefined) {
        throw new Error('useCity must be used within a CityProvider');
    }
    return context;
}

export { CityProvider, useCity };