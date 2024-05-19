import React, { useState } from 'react';
import './App.css';
import { auth , db} from './firebase';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const SignupLogin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const notValid = "Invalid username or password.";

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupData.email, signupData.password);
      const user = userCredential.user;
      await set(ref(db, 'users/' + user.uid), {
        username: signupData.username,
        email: signupData.email
      });
      console.log("Registration successful!");
      await signInWithEmailAndPassword(auth, signupData.email, signupData.password);
      console.log("Login successful!");
      navigate('/');
    } catch (error) {
      console.error('Signup/Login error:', error.message);
      alert(error.message);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
      alert('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.message);
      alert(notValid);
    }
  };

  return (
    <div className="signup-login-body">
      <input
        type="checkbox"
        id="chk"
        className="signup-login-checkbox"
        checked={isSignup}
        onChange={() => setIsSignup(!isSignup)}
      />

      <div className="signup-login-main">
        <div className={`signup-login-signup ${isSignup ? 'move-down' : ''}`}>
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="chk" aria-hidden="true" className="signup-login-label">Sign up</label>
            <input
              type="text"
              name="username"
              placeholder="Name"
              required
              className="signup-login-input"
              value={signupData.username}
              onChange={handleSignupChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="signup-login-input"
              value={signupData.email}
              onChange={handleSignupChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="signup-login-input"
              value={signupData.password}
              onChange={handleSignupChange}
            />
            <button type="submit" className="signup-login-button">Sign up</button>
          </form>
        </div>

        <div className={`signup-login-login ${isSignup ? 'move-up' : ''}`}>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="chk" aria-hidden="true" className={`signup-login-label signup-login-login-label`}>Login</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="signup-login-input"
              value={loginData.email}
              onChange={handleLoginChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="signup-login-input"
              value={loginData.password}
              onChange={handleLoginChange}
            />
            <button type="submit" className="signup-login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupLogin;
