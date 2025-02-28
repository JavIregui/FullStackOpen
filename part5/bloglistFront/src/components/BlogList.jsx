import React, { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import Notification from './Notification'
import NewBlog from './NewBlog'
import Togglable from './Togglable'


const BlogList = ({ message, setMessage, error, setError, user, setUser }) => {

    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        try {
            blogService.getAll().then(list =>
                setBlogs(list)
            )
        } catch (exception) {
            setMessage('Failed to fetch data from server')
            setError(true)
            setTimeout(() => {
                setMessage(null)
            }, 3000)
        }
    }, [])

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

    return (
        <div>
            <h2>blogs</h2>
            <Notification message={message} error={error} />

            <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

            <Togglable buttonLabel="new blog">
                <NewBlog
                    blogs={blogs}
                    setBlogs={setBlogs}
                    setMessage={setMessage}
                    setError={setError}
                />
            </Togglable>

            {blogs && blogs.length > 0 ?
                (
                    blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )
                ) :
                (
                    <p>No blogs available</p>
                )}
        </div>
    )
}

export default BlogList