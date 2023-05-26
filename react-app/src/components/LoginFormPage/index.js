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
	if (!email.includes("@")) err.email = "Please enter a valid email address."


  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {/* {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))} */}
          {Object.values(errors).length > 0 && <div className="errors">Invalid data</div>}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setDisEmailErr(true)
            }}
            // required
          />
        </label>
        {disEmailErr && <div className="errors">{err.email}</div>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setDisPassErr(true)
            }}
            // required
          />
        </label>
        {disPassErr && <div className="errors">{err.password}</div>}
        <button type="submit">Log In</button>
        <button onClick={demoUserLogIn}>Log in as a demo user</button>
      </form>
    </>
  );
}

export default LoginFormPage;
