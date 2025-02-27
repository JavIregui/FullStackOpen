import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
	const [blogs, setBlogs] = useState([])

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [user, setUser] = useState(null)

	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		)
	}, [])

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()

		const user = await loginService.login({
			username, password,
		})

		window.localStorage.setItem(
			'loggedUser', JSON.stringify(user)
		)
		blogService.setToken(user.token)

		setUser(user)
		setUsername('')
		setPassword('')
		console.log(user)
	}

	const handleLogout = () => {
		window.localStorage.removeItem('loggedUser')
		setUser(null)
		blogService.setToken(null)
	}

	const handleNewBlog = async (event) => {
		event.preventDefault()
		
		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		}

		const returnedBlog = await blogService.create(blogObject)
		setBlogs(blogs.concat(returnedBlog))
		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
	}

	const loginForm = () => (
		<div>
			<h2>log in to application</h2>
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
			<p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

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