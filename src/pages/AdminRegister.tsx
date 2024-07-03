import React, { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import api from '../utils/Helpers';
import axios, { AxiosResponse } from 'axios';
import './Admin.css';

type FormData = {
    username: string;
    email: string;
    password: string;

}
type ResponseData = {
    _id: string;
    email: string;
    token: string;
};

const VITE_API_BASE_URL = 'http://localhost:5000/api/user';

const AdminRegister: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: ''
        
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

  const navigate = useNavigate();

  const handleRegister = async () => {
  
        try {
            console.log('Submitting form data:', formData); // Log form data before making the request
            const response: AxiosResponse<ResponseData> = await axios.post(
                `${VITE_API_BASE_URL}/register`,
                formData
            );
            const { email } = response.data;
            alert(`Admin with email: ${email} registered successfully!`);
            // Navigate to the admin login page after successful registration
            navigate('/admin');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error registering the admin:', );
            } else {
                console.error('Other error:', error);
            }
  }};

    return (
    <div className="container">
      <h1>Register</h1>
      <input 
        type="text" 
        placeholder="Username" 
        value={formData.username} 
        onChange={handleChange} 
      />
      <input 
        type="email" 
        placeholder="email" 
        value={formData.email} 
        onChange={handleChange} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={formData.password} 
        onChange={handleChange} 
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};
  
export default AdminRegister;
