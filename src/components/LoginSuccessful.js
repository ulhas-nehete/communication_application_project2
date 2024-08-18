import React, { useEffect, useState } from 'react';

const LoginSuccess = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            setLoggedInUser(user);
        }
    }, []);
    
    return (
        <div className="text-center">
            <h1 className="pageHeader">Login Successful</h1>
            {loggedInUser && (
                <p><strong>Welcome ! </strong> <span>{loggedInUser.email}</span></p>
            )}
        </div>
    );
};

export default LoginSuccess;
