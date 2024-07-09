'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
    const router = useRouter();

    const [user, setUser] = React.useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('api/users/login', user);
            console.log('Login successful', response.data);
            router.push('/');
        } catch (error: any) {
            console.log('Login failed', error.message);
        } finally {
            setLoading(false);
        }
    };

  return (
    <>
        <div> LoginPage </div>
        <p>{loading && 'logging in...'}</p>
        <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Your Email..."
        />

        <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Your Password..."
        />

        <button
            onClick={onLogin}
            className="btn">
            Login
        </button>
    </>
  )
}

export default LoginPage