import React, { useState } from 'react';
import axios from '../utils/axios'; 

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage('Registered! You can now log in.');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} className="mb-2 w-full p-2 border" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="mb-2 w-full p-2 border" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="mb-4 w-full p-2 border" />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Register</button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}
