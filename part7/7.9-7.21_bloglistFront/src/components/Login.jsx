import { useState } from "react"
import Notification from "./Notification"

import { useDispatch } from "react-redux"
import { showNotification, showError } from "../reducers/notificationReducer"
import { loginUser } from "../reducers/userReducer"

const Login = () => {
	const dispatch = useDispatch()

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const loggedUser = await dispatch(loginUser(username, password))

			dispatch(showNotification(`logged in successfully as ${loggedUser.name}`, 3))
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
