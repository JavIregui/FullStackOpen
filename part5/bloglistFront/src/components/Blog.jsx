import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

	const [showDetails, setShowDetails] = useState(false)
	const [likes, setLikes] = useState(blog.likes)

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
	
	const addLike = () => {
		const newLikes = likes + 1

		blogService.update(blog.id, {
			likes: newLikes
		})
		setLikes(newLikes)
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
						{likes} likes
						<button onClick={addLike}>like</button>
					</div>
					<div>{blog.user.name}</div>
				</div>
			}
		</div>
	)
}

export default Blog