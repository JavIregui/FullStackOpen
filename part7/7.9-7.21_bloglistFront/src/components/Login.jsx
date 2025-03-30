import { useState } from "react"
import Notification from "./Notification"

import { useDispatch } from "react-redux"
import { showNotification, showError } from "../reducers/notificationReducer"
import { loginUser } from "../reducers/userReducer"

import styled from "styled-components"

const Container = styled.div`
	padding: 10px;
	padding-left: 25px;
	margin-bottom: 5px;
	background-color: darkgray;
`
const Title = styled.h2`
	font-family: "Verdana", sans-serif;
	text-transform: uppercase;
	color: white;
	font-size: 24px;
	margin-bottom: 20px;
`
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	gap: 5px;
	font-size: 14px;
	font-family: "Verdana", sans-serif;
	color: lightgray;
	text-transform: uppercase;
`
const Input = styled.input`
	padding: 10px;
	border: none;
	background-color: white;
	font-size: 14px;
	font-family: "Verdana", sans-serif;
	color: lightgray;
	&:focus {
		outline: none;
		border: 2px solid #4caf50;
		background-color: white;
	}
`
const Button = styled.button`
	border: none;
	color: white;
	padding: 10px 20px;
	font-size: 14px;
	font-weight: bold;
	text-transform: uppercase;
	cursor: pointer;
	margin-top: 20px;
	margin-bottom: 10px;
	background-color: #4caf50;
	&:hover {
		background-color: #45a049;
	}
`

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
		<Container>
			<Title>log in to application</Title>

			<Notification />

			<form onSubmit={handleLogin}>
				<InputContainer>
					username
					<Input
						type='text'
						value={username}
						name='Username'
						onChange={({ target }) => setUsername(target.value)}
					/>
				</InputContainer>
				<InputContainer>
					password
					<Input
						type='password'
						value={password}
						name='Password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</InputContainer>
				<Button type='submit'>login</Button>
			</form>
		</Container>
	)
}

export default Login
