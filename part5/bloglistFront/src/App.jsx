import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

// setMessage('Failed to fetch data from server')
// setError(true)
// setTimeout(() => {
// 	setMessage(null)
// }, 3000)

const App = () => {
	const [blogs, setBlogs] = useState([])

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [user, setUser] = useState(null)

	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const [message, setMessage] = useState(null)
	const [error, setError] = useState(false)

	useEffect(() => {
		try {
			blogService.getAll().then(blogs =>
				setBlogs(blogs)
			)
		} catch (exception) {
			setMessage('Failed to fetch data from server')
			setError(true)
			setTimeout(() => {
				setMessage(null)
			}, 3000)
		}
	}, [])

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

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})

			window.localStorage.setItem(
				'loggedUser', JSON.stringify(user)
			)
			blogService.setToken(user.token)

			setUser(user)

			setMessage(`logged in successfully as ${user.name}`)
			setError(false)
			setTimeout(() => {
				setMessage(null)
			}, 3000)

		} catch (exception) {
			setMessage('wrong username or password')
			setError(true)
			setTimeout(() => {
				setMessage(null)
			}, 3000)
		}

		setUsername('')
		setPassword('')
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser')
		setUser(null)
		blogService.setToken(null)

		setMessage('logged out successfully')
		setError(false)
		setTimeout(() => {
			setMessage(null)
		}, 3000)
	}

	const handleNewBlog = async (event) => {
		event.preventDefault()

		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		}

		if(!newTitle || !newAuthor || !newUrl) {
			setMessage('please fill all fields')
			setError(true)
			setTimeout(() => {
				setMessage(null)
			}, 3000)
			return
		}

		try {
			const returnedBlog = await blogService.create(blogObject)
			setBlogs(blogs.concat(returnedBlog))

			setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
			setError(false)
			setTimeout(() => {
				setMessage(null)
			}, 3000)
		} catch (exception) {
			setMessage('failed to create new blog')
			setError(true)
			setTimeout(() => {
				setMessage(null)
			}, 3000)
		}

		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
	}

	const loginForm = () => (
		<div>
			<h2>log in to application</h2>
			<Notification message={message} error={error} />
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		</div>
	)

	const blogsApp = () => (
		<div>
			<h2>blogs</h2>
			<Notification message={message} error={error} />
			<p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

			<h2>create new</h2>
			<form onSubmit={handleNewBlog}>
				<div>
					title
					<input
						type="text"
						value={newTitle}
						name="Title"
						onChange={({ target }) => setNewTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						type="text"
						value={newAuthor}
						name="Author"
						onChange={({ target }) => setNewAuthor(target.value)}
					/>
				</div>
				<div>
					url
					<input
						type="text"
						value={newUrl}
						name="Url"
						onChange={({ target }) => setNewUrl(target.value)}
					/>
				</div>
				<button type="submit">create</button>
			</form>

			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	)

	return (
		<>
			{user === null ?
				loginForm() :
				blogsApp()
			}
		</>
	)
}

export default App