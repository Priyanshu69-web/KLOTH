import { useState,useEffect,useContext,createContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {

    const [auth,setAuth]=useState(() => {
        const data = localStorage.getItem('auth');
        if (!data) {
            return {
                user: null,
                token: "",
            };
        }

        const parseData = JSON.parse(data);
        return {
            user: parseData.user,
            token: parseData.token,
        };
    });

    // Set axios base URL for backend API
axios.defaults.baseURL = API_BASE_URL;

    useEffect(()=>{
        if (auth?.token) {
            axios.defaults.headers.common.Authorization = `Bearer ${auth.token}`;
            return;
        }

        delete axios.defaults.headers.common.Authorization;
    }, [auth?.token]);

    return(
        <AuthContext.Provider value={[auth, setAuth]}>

            {children}
        </AuthContext.Provider>
    );
    };
//Custom hook

const useAuth = ()=> useContext(AuthContext);

export {useAuth,AuthProvider};
