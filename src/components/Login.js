
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.email === email && user.password === password);

        // Email validation
        if (email === '') {
            setMessage('Please enter email');
            return;
        }

        // valid Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setMessage('Please enter a valid email');
            return;
        }

        // Password validation
        if (password === '') {
            setMessage('Please enter password');
            return;
        }
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            // Redirect to loginsuccessful
            navigate('/loginsuccessful');
        } else {
            setMessage('Invalid email or password!');
        }
    };

    return (
        <div className="container-small">
            <h1 className="text-center pageHeader">Login</h1>
            <form onSubmit={handleLogin} noValidate>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                </div>
                <button type="submit" className="btn btn-default">Login</button>
            </form>
            <div className='mt-2'>{message && <span className="error">{message}</span>}</div>
        </div>
    );
};

export default Login;
