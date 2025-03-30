import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import Notification from "./Notification"

import { useDispatch } from "react-redux"
import { showNotification, showError } from "../reducers/notificationReducer"

const Login = ({ setUser }) => {
	const dispatch = useDispatch()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username,
				password,
			})

			window.localStorage.setItem("loggedUser", JSON.stringify(user))
			blogService.setToken(user.token)

			setUser(user)

			dispatch(showNotification(`logged in successfully as ${user.name}`, 3))
		} catch (exception) {
			dispatch(showError("wrong username or password", 3))
		}

		setUsername("")
		setPassword("")
	}

	return (
		<div>
			<h2>log in to application</h2>

			<Notification />

			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	)
}

export default Login
