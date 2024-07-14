import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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
            const response = await loginUser(email, password);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard', { state: { email } });
            } else {
                setError(response.data.message);
                setIsSubmitting(false); 
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Login failed. Please try again.');
            setIsSubmitting(false); 
        }
    };

    return (
        <div className="login-container">
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
                    <form onSubmit={handleSubmit} className="login-form">
                        <h1>Login</h1>
                        <div className="input-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="input-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <button type="submit" className="login-button" disabled={isSubmitting}>Login</button>
                        {error && <p className="error-message">{error}</p>}
                        <p className="navigation-link">
                            Not Registered? <span onClick={() => navigate('/register')} style={{color: '#007bff', cursor: 'pointer', textDecoration: 'underline'}}>Register here</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
