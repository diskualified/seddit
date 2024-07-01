'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import axios from 'axios';

const RegisterPage = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    username: '',
    email: '',
    password: '',
  })

  const [loading, setLoading] = React.useState(false)

  const onRegister = async () => {
    try {
        setLoading(true)
        const res = await axios.post('/api/users/register', user)
        console.log('Registration Succeful', res.data)
        router.push('/login')
    } catch (error) {
        console.log('Failed to register: ' + error)
    } finally {
        setLoading(false)
    }
  }


  return (
    <>
      <div>RegisterPage</div>
      <p>{loading && 'loading...'}</p>
      <input type='text' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder='Username'/>
      <input type='text' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email'/>
      <input type='text' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password'/>
      <button className='btn' onClick={onRegister}>Register</button>
    </>    
  )
}

export default RegisterPage