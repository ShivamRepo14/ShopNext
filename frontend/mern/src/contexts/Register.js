import React, { useContext, useState } from 'react';
import '../css/Auth.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { usercontext } from '../App';
import { toast } from 'react-toastify';

const Register = () => {
  const { dispatch } = useContext(usercontext);
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.email || !user.password) {
      toast.warn('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/register', user);
      if (response.status === 200) {
        dispatch({ type: 'user', payload: true });
        toast.success('Register Success');
        navigate('/');
      }
    } catch {
      toast.error('Email already exists');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="form-group">
            <label>Username</label>
            <input type='text' name='name' placeholder='Enter your name' value={user.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type='email' name='email' placeholder='Enter your email' value={user.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type='password' name='password' placeholder='Enter your password' value={user.password} onChange={handleChange} />
          </div>
          <button type='submit' className="auth-button" >Register</button>
          <p className="switch-auth">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
