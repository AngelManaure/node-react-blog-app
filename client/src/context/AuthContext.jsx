import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie"

import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth"

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deberia estar dentro de un AuthProvider")
    } else {
        return context
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user, setNavActive, setRegisterActive) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setRegisterActive(false)
            setNavActive(false)
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const signin = async (user, setNavActive, setLoginActive) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data)
            setLoginActive(true)
            setNavActive(false)
            setIsAuthenticated(true)
        } catch (error){
            if (Array.isArray(error.response.data)) {
              return setErrors(error.response.data);
            } else {
              setErrors([error.response.data.message]);
            }
          }
        }

    const logout = (setNavActive) => {
        Cookies.remove("token");
        setIsAuthenticated(false)
        setUser(null)
        setNavActive(false)
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    setUser(null);
                    return;
                } else {
                    setIsAuthenticated(true);
                    setUser(res.data);
                    setLoading(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                logout,
                loading,
                user,
                isAuthenticated,
                errors,
            }}
        >
            { children }
        </AuthContext.Provider>
    );
};