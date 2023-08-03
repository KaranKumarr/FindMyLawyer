import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const value = await AsyncStorage.getItem('@auth');
                if (value) {
                    setAuth(JSON.parse(value));
                }
            } catch (error) {
                console.log('AsyncStorage Error: ' + error);
            }
        };
        fetchData();
    }, []);


    console.log(auth);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;