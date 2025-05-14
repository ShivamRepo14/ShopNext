import React, { useContext, useState } from 'react';
import '../css/Auth.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { usercontext } from '../App';
import { toast } from 'react-toastify';

const Login = () => {
  const [values, setValues] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { dispatch } = useContext(usercontext);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      toast.warn('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', values);
      if (response.status === 200) {
        dispatch({ type: 'user', payload: true });
        toast.success('Login Success');
        navigate('/');
      }
    } catch {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-group">
            <label>Email</label>
            <input type='email' name='email' placeholder='Enter your email' value={values.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type='password' name='password' placeholder='Enter your password' value={values.password} onChange={handleChange} />
          </div>
          <button type='submit' className="auth-button">Login</button>
          <p className="switch-auth">
            New user? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
