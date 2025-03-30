import { useState, useEffect } from "react"
import blogService from "./services/blogs"
import Login from "./components/Login"
import BlogList from "./components/BlogList"

const App = () => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser")
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
			{user === null ? (
				<Login setUser={setUser} />
			) : (
				<BlogList
					user={user}
					setUser={setUser}
				/>
			)}
		</>
	)
}

export default App
