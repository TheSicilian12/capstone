import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp, login } from "../../store/session";
import shinanoLogoMini from "../assets/Images/ShinanoLogoSmall.jpg"
import './SignupForm.css';
import '../UniversalCSS.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [disEmailErr, setDisEmailErr] = useState(false);
  const [username, setUsername] = useState("");
  const [disUsernameErr, setDisUsernameErr] = useState(false);
  const [password, setPassword] = useState("");
  const [disPassErr, setDisPassErr] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disConfirmPassErr, setDisConfirmPassErr] = useState(false);
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const demoUserLogIn = (e) => {
    e.preventDefault()
    dispatch(login("demo@aa.io", "password"))
  }

  let err = {}
  // console.log("password length: ", password.length)
  if (password.length < 8) err.password = "Password should be 8+ characters."
  if (username.length < 4) err.username = "Username should be 4+ characters."
  const regEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (!regEx.test(email)) err.email = "Please enter a valid email address."
  if (password !== confirmPassword) err.confirmPassword = "This does not match the password."

  let disableLogin = "button-disabled";
  if (!Object.values(err).length > 0) disableLogin = "button-no-dimensions"

  return (
    <div className="login-container">
      <div className="login-logo-container">
        <img
          className="login-logo"
          src={shinanoLogoMini} />

      </div>
      <form className="login-form-container" onSubmit={handleSubmit}>
        <h1 className="login-form-header">Create account</h1>
        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}

        <div className="login-form-input-contianer">
          <label>
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setDisEmailErr(true)
            }}
          // required
          />
          {disEmailErr && <div className="errors">{err.email}</div>}
        </div>
        <div className="login-form-input-contianer">
          <label>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
              setDisUsernameErr(true)
            }}
          // required
          />
          {disUsernameErr && <div className="errors">{err.username}</div>}
        </div>
        <div className="login-form-input-contianer">
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setDisPassErr(true)
            }}
          // required
          />
          {disPassErr && <div className="errors">{err.password}</div>}
        </div>
        <div className="login-form-input-contianer">
          <label>
            Re-enter Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setDisConfirmPassErr(true)
            }}
          // required
          />
          {(disConfirmPassErr || disPassErr) && <div className="errors">{err.confirmPassword}</div>}
        </div>
        <button
          className={`login-page-button ${disableLogin}`}
          type="submit"
          disabled={Object.values(err).length > 0}>
          Sign Up
        </button>
        <button
          className="login-page-button button-no-dimensions"
          onClick={demoUserLogIn}>
            Log in as a demo user
          </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
