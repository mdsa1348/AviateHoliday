import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';

const AuthPage = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
    resetEmail: '',
    otp: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [isForgetPassword, setIsForgetPassword] = useState(false);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setErrorMessage('');
  };

  const toggleForgetPassword = () => {
    setIsForgetPassword(true);
    setIsSignIn(false);
    setErrorMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();  // Prevent form reload
    const { email, password } = formData;
    console.log('Signing in with:', { email, password });

    try {
      const response = await axios.post('http://localhost:3001/api/signin', {
        email,
        password,
      });

      // const userinfo = await axios.get('http://localhost:3001/api/user', {
      //   email,        
      // });
      navigate('/home');
      console.log('Signin successful:', response.data);

      setAuthToken(response.data.token);

      localStorage.setItem('AviateHolidaysUserInfo', JSON.stringify({
        token: response.data.token,
        email: email,
      }));
      window.location.reload();
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please check your email and password.");
      }
      setErrorMessage(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleSignUp = async () => {
    const { name, email, address, password } = formData;

    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        name,
        email,
        address,
        password,
      });


      
      console.log('Signup successful:', response.data);
      setAuthToken(response.data.token);

      // Store user info in local storage
      localStorage.setItem('AviateHolidaysUserInfo', JSON.stringify({
        token: response.data.token,
       
        email: email,
        
      }));
      navigate('/home');

      window.location.reload();

    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { resetEmail } = formData;

    try {
      // Send OTP request to server
      const response = await axios.post('http://localhost:3001/api/forgotpassword', {
        email: resetEmail,
      });
      console.log('OTP sent successfully:', response.data);
      // Show reset form after OTP sent
      setIsForgetPassword(true);
    } catch (error) {
      console.error('Error sending OTP:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const { resetEmail, otp, password } = formData;

    try {
      // Reset password request to server
      const response = await axios.post('http://localhost:3001/api/resetpassword', {
        email: resetEmail,
        otp: otp,
        password: password,
      });
      console.log('Password reset successful:', response.data);
      setAuthToken(response.data.token);

      // Store updated user info in local storage
      localStorage.setItem('AviateHolidaysUserInfo', JSON.stringify({
        token: response.data.token,
        email: resetEmail,
      }));
      window.location.reload();

    } catch (error) {
      console.error('Error resetting password:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data.error : 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <div className={`form-box ${isSignIn ? 'signin' : 'signup'} ${isForgetPassword ? 'forget-password' : ''}`}>
          <h2>{isSignIn ? 'Sign In' : (isForgetPassword ? 'Reset Password' : 'Sign Up')}</h2>
          <form onSubmit={isForgetPassword ? handleResetSubmit : (isSignIn ? handleSignIn : handleSignUp)}>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {isSignIn && !isForgetPassword && (
              <>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button className='Submit' type="submit">Sign In</button>
                <p className='account' onClick={toggleForm}>Don't have an account? Sign Up</p>
                <p className='forget-password' onClick={toggleForgetPassword}>Forget Password?</p>
              </>
            )}
            {!isSignIn && !isForgetPassword && (
              <>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <button type="submit">Sign Up</button>
                <p className='account' onClick={toggleForm}>Already have an account? Sign In</p>
              </>
            )}
            {isForgetPassword && (
              <>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="email" name="resetEmail" placeholder='Enter the gmail, you have account.' value={formData.resetEmail} onChange={handleChange} required />
                </div>
                <button type="button" onClick={handleResetPassword}>Send OTP</button>
                <div className="form-group">
                  <label>OTP:</label>
                  <input type="text" name="otp" placeholder='Sent on your gmail' value={formData.otp} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>New Password:</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Confirm New Password:</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </div>
                <button type="submit">Reset Password</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
