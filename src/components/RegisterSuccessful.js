import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterSuccess = () => {
    const [latestUser, setLatestUser] = useState(null);

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        setLatestUser(users[users.length - 1]);
    }, []);

    return (
        <div className="container-small text-center">
            <h1 className='pageHeader'>Registration Successful</h1>
            {latestUser && (
                <p>
                    Thank you for registering, <strong>{latestUser.fullname}</strong>.
                </p>
            )}
            <Link to="/">Click to return to home page</Link>
        </div>
    );
};

export default RegisterSuccess;
