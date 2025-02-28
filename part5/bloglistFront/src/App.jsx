import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogList from './components/BlogList'

const App = () => {
	const [user, setUser] = useState(null)

	const [message, setMessage] = useState(null)
	const [error, setError] = useState(false)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		} else {
			setUser(null)
			blogService.setToken(null)
		}
	}, [])

	return (
		<>
			{user === null ?
				<Login
					setUser={setUser}
					setMessage={setMessage}
					setError={setError}
					message={message}
					error={error}
				/> :
				<BlogList
					setMessage={setMessage}
					setError={setError}
					message={message}
					error={error}
					user={user}
					setUser={setUser}
				/>
			}
		</>
	)
}

export default App