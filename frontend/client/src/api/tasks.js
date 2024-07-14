import axios from 'axios';

const API_URL = 'http://localhost:8000/api/tasks/';

export const fetchTasks = async () => {
    console.log(localStorage.getItem('token'))
    const response = await axios.get(`${API_URL}list`, {
        
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const createTask = async (taskData) => {
    console.log(localStorage.getItem('token'))
    const response = await axios.post(`${API_URL}create`, taskData, {
        
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const updateTask = async (id, taskData) => {
    console.log(localStorage.getItem('token'))
    const response = await axios.put(`${API_URL}${id}/update`, taskData, {
       
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};

export const deleteTask = async (id) => {
    console.log(localStorage.getItem('token'))
    const response = await axios.delete(`${API_URL}${id}/delete`, {
       
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
};
