import React, { useState } from "react"

import { useDispatch } from "react-redux"
import { remove, like } from "../reducers/blogReducer"

const Blog = ({ blog, user }) => {
	const dispatch = useDispatch()

	const [showDetails, setShowDetails] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	}

	const toggleDetails = () => {
		setShowDetails(!showDetails)
	}

	const addLike = async () => {
		dispatch(like(blog.id, { likes: blog.likes + 1 }))
	}

	const deleteBlog = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
			dispatch(remove(blog.id))
		}
	}

	return (
		<div style={blogStyle}>
			<div>
				{blog.title} {blog.author}
				<button onClick={toggleDetails}>{showDetails ? "hide" : "view"}</button>
			</div>

			{showDetails && (
				<div>
					<a href={`https://${blog.url}`}>{blog.url}</a>
					<div>
						{blog.likes} likes
						<button onClick={addLike}>like</button>
					</div>
					<div>{blog.user.name}</div>
					{user.username === blog.user.username && <button onClick={deleteBlog}>remove</button>}
				</div>
			)}
		</div>
	)
}

export default Blog
