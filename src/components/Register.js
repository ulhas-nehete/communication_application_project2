
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // Full Name validation
        if (fullname === '') {
            setMessage('Please enter full name');
            return;
        }

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
        } else if (password.length < 8) {
            setMessage('Password must be at least 8 characters long');
            return;
        }

        // Confirm Password validation
        if (confirmPassword === '') {
            setMessage('Please confirm your password');
            return;
        } else if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }


        // users from local storage 
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the email already exists
        const emailExists = users.some((user) => user.email === email);
        if (emailExists) {
            setMessage('Email already registered!');
            return;
        }

        const userId = Date.now();

        // Create a new user
        const newUser = {
            id: userId,
            fullname,
            email,
            password,
        };

        // Add the new user
        users.push(newUser);

        // Save the updated users in local storage
        localStorage.setItem('users', JSON.stringify(users));

        // Clear message
        setFullname('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/registersuccessful');
    };

    return (
        <div className="container-small">
            <h1 className="pageHeader">Register</h1>
            <form onSubmit={handleRegister} noValidate>
                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input className="form-control" type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input className="form-control" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn-default">Register</button>
            </form>
            <div className='mt-2'>{message && <span className="error">{message}</span>}</div>
        </div>
    );
};

export default Register;
