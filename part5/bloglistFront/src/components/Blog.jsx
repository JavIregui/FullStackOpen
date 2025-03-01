import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {

	const [showDetails, setShowDetails] = useState(false)

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const toggleDetails = () => {
		setShowDetails(!showDetails)
	}

	const addLike = async () => {
		const returnedBlog = await blogService.update(blog.id, {
			likes: blog.likes + 1
		})

		setBlogs(prevBlogs => {
			const updatedBlogs = prevBlogs.map(b =>
				b.id === returnedBlog.id
					? { ...b, ...returnedBlog }
					: b
			);
			return updatedBlogs.sort((a, b) => b.likes - a.likes);
		})
	}

	return (
		<div style={blogStyle}>
			<div>
				{blog.title} {blog.author}

				<button onClick={toggleDetails}>{showDetails ? 'hide' : 'view'}</button>
			</div>

			{showDetails &&
				<div>
					<a href={`https://${blog.url}`}>{blog.url}</a>
					<div>
						{blog.likes} likes
						<button onClick={addLike}>like</button>
					</div>
					<div>{blog.user.name}</div>
				</div>
			}
		</div>
	)
}

export default Blog