import React, { useState, useEffect, useRef } from "react"
import blogService from "../services/blogs"
import Blog from "./Blog"
import Notification from "./Notification"
import NewBlog from "./NewBlog"
import Togglable from "./Togglable"

import { useDispatch } from "react-redux"
import { showNotification, showError } from "../reducers/notificationReducer"

const BlogList = ({ user, setUser }) => {
	const dispatch = useDispatch()

	const [blogs, setBlogs] = useState([])

	const newBlogRef = useRef()

	useEffect(() => {
		try {
			blogService.getAll().then((list) => {
				const sortedList = list.sort((a, b) => b.likes - a.likes)
				setBlogs(sortedList)
			})
		} catch (exception) {
			dispatch(showError("Failed to fetch data from server", 3))
		}
	}, [])

	const handleLogout = () => {
		window.localStorage.removeItem("loggedUser")
		setUser(null)
		blogService.setToken(null)

		dispatch(showNotification("logged out successfully", 3))
	}

	return (
		<div>
			<h2>blogs</h2>

			<Notification />

			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>

			<Togglable
				buttonLabel='create new blog'
				ref={newBlogRef}
			>
				<NewBlog
					setBlogs={setBlogs}
					toggleRef={newBlogRef}
				/>
			</Togglable>

			{blogs && blogs.length > 0 ? (
				blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						setBlogs={setBlogs}
						user={user}
					/>
				))
			) : (
				<p>No blogs available</p>
			)}
		</div>
	)
}

export default BlogList
