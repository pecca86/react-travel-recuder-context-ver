import { authReducer } from "../reducer/authReducer";
import { useContext, createContext, useReducer,  } from "react";

const AuthContext = createContext();
 
const AuthProvider = ({ children }) => {


    const initialState = {
        user: null,
        isAuthenticated: false,
    };

    const [{user, isAuthenticated}, dispatch] = useReducer(authReducer, {});

    const signIn = async (email, password) => {
        if (email === "homo@kakka.fi" && password === "kakka") {
            dispatch({ type: "SIGN_IN", payload: { name: "kakuli", email: email } });
        }
    }

    const signOut = async () => {
        dispatch({ type: "SIGN_OUT" });
    }
    
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>{children}</AuthContext.Provider>
    );

};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };