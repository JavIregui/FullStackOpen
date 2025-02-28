import React, { useState } from 'react'

const Blog = ({ blog }) => {

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
						<button>like</button>
					</div>
					<div>{blog.user.name}</div>
				</div>
			}
		</div>
	)
}

export default Blog