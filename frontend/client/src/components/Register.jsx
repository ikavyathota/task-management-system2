import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import { registerUser } from '../api/auth';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer); 
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true); 
        try {
            const response = await registerUser(email, password);
            if (response.status === 200) {
                setSuccess('Successfully registered. Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(response.data.message);
                setIsSubmitting(false); 
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Registration failed. Please try again.');
            setIsSubmitting(false); 
        }
    };

    return (
        <div className="register-container">
            <div className="header">
                <h1>Task Management System</h1>
                <div className="time-display">
                    <p>{time}</p>
                </div>
            </div>
            <div className="content">
                <div className="left-panel">
                    <h2>Let's Manage Tasks to Achieve Goals Efficiently</h2>
                </div>
                <div className="right-panel">
                    <form onSubmit={handleSubmit} className="register-form">
                        <h1>Register</h1>
                        <div className="input-group">
                            <label>Email:</label>
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={isSubmitting} />
                        </div>
                        <div className="input-group">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required disabled={isSubmitting} />
                        </div>
                        <button type="submit" className="register-button" disabled={isSubmitting}>Register</button>
                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        <p className="navigation-link">
                            Registered? <span onClick={() => navigate('/login')} style={{color: '#007bff', cursor: 'pointer', textDecoration: 'underline'}}>Login here</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
