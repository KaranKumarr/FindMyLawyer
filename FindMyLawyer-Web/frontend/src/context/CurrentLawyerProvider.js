import { createContext, useState, useEffect } from "react";


const CurrentLawyerContext = createContext({});

export const CurrentLawyerProvider = ({ children }) => {

    const [currentLawyer, setCurrentLawyer] = useState({});


    useEffect(() => {
        setCurrentLawyer(JSON.parse(localStorage.getItem("current")));
    }, []);


    return (
        <CurrentLawyerContext.Provider value={{ currentLawyer, setCurrentLawyer }}>
            {children}
        </CurrentLawyerContext.Provider>
    );
};

export default CurrentLawyerContext;