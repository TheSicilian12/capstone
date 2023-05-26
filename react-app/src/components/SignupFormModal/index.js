import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp, login } from "../../store/session";
import "./SignupForm.css";
import '../UniversalCSS.css'

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [disEmailErr, setDisEmailErr] = useState(false);
	const [username, setUsername] = useState("");
	const [disUsernameErr, setDisUsernameErr] = useState(false);
	const [password, setPassword] = useState("");
	const [disPassErr, setDisPassErr] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [disConfirmPassErr, setDisConfirmPassErr] = useState(false);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();


	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	const demoUserLogIn = (e) => {
		e.preventDefault()
		dispatch(login("demo@aa.io", "password"))
		closeModal()
	  }

	let err = {}
	// console.log("password length: ", password.length)
	if (password.length < 8) err.password = "Password should be 8+ characters."
	if (username.length < 4) err.username = "Username should be 4+ characters."
	if (!email.includes("@")) err.email = "Please enter a valid email address."
	if (password !== confirmPassword) err.confirmPassword = "This does not match the password."

	return (
		<>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
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
					Username
					<input
						type="text"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value)
							setDisUsernameErr(true)
						}}
						// required
					/>
				</label>
				{disUsernameErr && <div className="errors">{err.username}</div>}
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
				<label>
					Confirm Password
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => {
							setConfirmPassword(e.target.value)
							setDisConfirmPassErr(true)
						}}
						// required
					/>
				</label>
				{(disConfirmPassErr || disPassErr) && <div className="errors">{err.confirmPassword}</div>}
				<button
					type="submit"
					disabled={Object.values(err).length > 0}>
						Sign Up
				</button>
				<button onClick={demoUserLogIn}>Log in as a demo user</button>
			</form>
		</>
	);
}

export default SignupFormModal;
