import React, { useEffect, useRef } from "react"
import Blog from "./Blog"
import Notification from "./Notification"
import NewBlog from "./NewBlog"
import Togglable from "./Togglable"

import { useDispatch, useSelector } from "react-redux"
import { showError } from "../reducers/notificationReducer"
import { initializeBlogs } from "../reducers/blogReducer"

const BlogList = () => {
	const blogs = useSelector((state) => state.blogs)
	const dispatch = useDispatch()

	const newBlogRef = useRef()

	useEffect(() => {
		try {
			dispatch(initializeBlogs())
		} catch (exception) {
			dispatch(showError("Failed to fetch data from server", 3))
		}
	}, [])

	return (
		<div>
			<h2>blogs</h2>

			<Notification />

			<Togglable
				buttonLabel='create new blog'
				ref={newBlogRef}
			>
				<NewBlog toggleRef={newBlogRef} />
			</Togglable>

			{blogs && blogs.length > 0 ? (
				blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
					/>
				))
			) : (
				<p>No blogs available</p>
			)}
		</div>
	)
}

export default BlogList
