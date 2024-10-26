import React, { useState } from 'react';
import './AuthDemo.css';
import { useNavigate } from 'react-router-dom';

const AuthDemo = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const navigate = useNavigate();

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };
    const handleNavigate = (path) => {
        navigate(path);
      };

    return (
        <div>
            <div className="button-row">
                <button onClick={() => handleNavigate('/about')}>About</button>
                <button onClick={() => handleNavigate('/authDemo')}>Auth Demo</button>
                <button onClick={() => handleNavigate('/googlelogin')}>Google Login</button>
            </div>
            <div className="auth-demo-container">
                <div className="auth-card">
                    {isSignIn ? (
                        <>
                            <div className="auth-form sign-in">
                                <h2>Sign In</h2>
                                <form>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="email" name="email" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input type="password" name="password" required />
                                    </div>
                                    <button type="submit">Sign In</button>
                                </form>
                            </div>
                            <div className="auth-toggle sign-up">
                                <p className="auth-text">Don't have an account?</p>
                                <button className="auth-button" onClick={toggleForm}>Sign Up</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="auth-toggle sign-in">
                                <p className="auth-text">Already have an account?</p>
                                <button className="auth-button" onClick={toggleForm}>Sign In</button>
                            </div>
                            <div className="auth-form sign-up">
                                <h2>Sign Up</h2>
                                <form className='authform'>
                                    <div className="form-group">
                                        <label>Name:</label>
                                        <input type="text" name="name" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input type="email" name="email" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Password:</label>
                                        <input type="password" name="password" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Confirm Password:</label>
                                        <input type="password" name="confirmPassword" required />
                                    </div>
                                    <button type="submit">Sign Up</button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthDemo;
