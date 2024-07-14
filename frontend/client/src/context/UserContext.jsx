

import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, error }}>
            {children}
        </UserContext.Provider>
    );
};
