import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import shinanoLogoMini from "../assets/Images/ShinanoLogoSmall.jpg"
import "./LoginForm.css";
import '../UniversalCSS.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [disEmailErr, setDisEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [disPassErr, setDisPassErr] = useState(false);
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoUserLogIn = (e) => {
    e.preventDefault()
    dispatch(login("demo@aa.io", "password"))
  }

  let err = {}
  if (password.length < 8) err.password = "Password should be 8+ characters."
  const regEx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  if (!regEx.test(email)) err.email = "Please enter a valid email address."

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
        <h1 className="login-form-header">Sign in</h1>
        {Object.values(errors).length > 0 && <div className="errors">Invalid data</div>}
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
        <div className="login-form-input-contianer login-page-last-input-margin">
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
        <button
          className={`login-page-button ${disableLogin}`}
          type="submit"
          disabled={Object.values(err).length > 0}>
          Log In
        </button>
        <button
          className="login-page-button button-no-dimensions"
          onClick={demoUserLogIn}>
          Log in as a demo user
        </button>
      </form>
      <div className="login-page-sign-up">
        <div className="login-page-signup-text">New to Shinano?</div>
        <button
          className="login-page-signup-button"
          onClick={() => history.push("/signup")}>
          Create your Shinano account
        </button>
      </div>
    </div>
  );
}

export default LoginFormPage;
