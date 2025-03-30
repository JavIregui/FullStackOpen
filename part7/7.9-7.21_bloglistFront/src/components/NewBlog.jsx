import { useState } from "react"
import blogService from "../services/blogs"

import { useDispatch } from "react-redux"
import { showNotification, showError } from "../reducers/notificationReducer"

const NewBlog = ({ setBlogs, toggleRef }) => {
	const dispatch = useDispatch()

	const [newTitle, setNewTitle] = useState("")
	const [newAuthor, setNewAuthor] = useState("")
	const [newUrl, setNewUrl] = useState("")

	const handleNewBlog = async (event) => {
		event.preventDefault()

		if (!newTitle || !newAuthor || !newUrl) {
			dispatch(showError("please fill all fields", 3))
			return
		}

		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		}

		try {
			const returnedBlog = await blogService.create(blogObject)
			setBlogs((prevBlogs) => {
				const newBlogs = [...prevBlogs, returnedBlog]
				return newBlogs.sort((a, b) => b.likes - a.likes)
			})

			toggleRef.current.toggleVisibility()

			dispatch(showNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 3))
		} catch (exception) {
			dispatch(showError("failed to create new blog", 3))
		}

		setNewTitle("")
		setNewAuthor("")
		setNewUrl("")
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={handleNewBlog}>
				<div>
					title
					<input
						type='text'
						value={newTitle}
						name='Title'
						onChange={({ target }) => setNewTitle(target.value)}
						placeholder='blog title...'
					/>
				</div>
				<div>
					author
					<input
						type='text'
						value={newAuthor}
						name='Author'
						onChange={({ target }) => setNewAuthor(target.value)}
						placeholder='by...'
					/>
				</div>
				<div>
					url
					<input
						type='text'
						value={newUrl}
						name='Url'
						onChange={({ target }) => setNewUrl(target.value)}
						placeholder='found at...'
					/>
				</div>
				<button type='submit'>create</button>
			</form>
		</>
	)
}

export default NewBlog
