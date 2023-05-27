import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import '../UniversalCSS.css'

function LoginFormPage() {
  const dispatch = useDispatch();
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

  return (
    <div className="login-container">
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
        <button
          type="submit"
          disabled={Object.values(err).length > 0}>
          Log In
        </button>
        <button onClick={demoUserLogIn}>Log in as a demo user</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
