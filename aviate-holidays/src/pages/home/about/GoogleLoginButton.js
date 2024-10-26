import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import './GoogleLoginButton.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  const responseGoogle = (response) => {
    if (response.credential) {
      const token = response.credential;

      axios.post('http://localhost:3001/api/auth/google', { token })
        .then(res => {
          console.log(res.data);
          setIsLoggedIn(true);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  const logout = () => {
    googleLogout();
    setIsLoggedIn(false);
  };

  return (
    <GoogleOAuthProvider clientId="208114179115-ct1m9gm0dcnc4tmhtmecbcuipe77ncc7.apps.googleusercontent.com">
      <div className="google-login-container">
      <div className="button-row">
                <button onClick={() => handleNavigate('/about')}>About</button>
                <button onClick={() => handleNavigate('/authDemo')}>Auth Demo</button>
                <button onClick={() => handleNavigate('/googlelogin')}>Google Login</button>
            </div>
        <h2>Login with Google</h2>
        {isLoggedIn ? (
          <div>
            <p>You are logged in.</p>
            <button onClick={logout} className="logout-button">Logout</button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={responseGoogle}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        )}
        <p>Click the button above to sign in using your Google account.</p>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
