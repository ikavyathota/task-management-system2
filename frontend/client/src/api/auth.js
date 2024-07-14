import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users'; 
export const registerUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { email, password });
        return response; 
    } catch (error) {
        throw error; 
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response;
    } catch (error) {
        throw error; 
    }
};

