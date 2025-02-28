import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlog = ({ blogs, setBlogs, setMessage, setError }) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleNewBlog = async (event) => {
		event.preventDefault()

		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		}

		if (!newTitle || !newAuthor || !newUrl) {
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

    return (
        <>
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
        </>
    )
}

export default NewBlog