export const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                isLoading: true
            };
        case "CITITES_LOADED":
            return {
                ...state,
                cities: action.payload,
                isLoading: false
            };
        case "CURRENT_CITY":
            return {
                ...state,
                currentCity: action.payload,
                isLoading: false
            };
        case "CITY_CREATED":
            return {
                ...state,
                cities: [...state.cities, action.payload]
            };
        case "CITY_DELETED":
            return {
                ...state,
                cities: state.cities.filter(city => city.id !== action.payload)
            };
        default:
            return state;

    }
}