export const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };
        case "SIGN_OUT":
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        default:
            return state;
    }
};