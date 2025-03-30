import React, { useEffect } from "react"
import { useMatch, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { remove, like, initializeBlogs } from "../reducers/blogReducer"

const BlogInfo = () => {
	const blogs = useSelector((state) => state.blogs)
	useEffect(() => {
		if (blogs.length === 0) {
			dispatch(initializeBlogs())
		}
	}, [])

	const user = useSelector((state) => state.user)

	const match = useMatch("/blogs/:id")
	const selectedBlogId = match ? match.params.id : null

	const selectedBlog = blogs.find((blog) => blog.id === selectedBlogId)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const addLike = async () => {
		dispatch(like(selectedBlog.id, { likes: selectedBlog.likes + 1 }))
	}

	const deleteBlog = async () => {
		if (window.confirm(`Remove blog ${selectedBlog.title} by ${selectedBlog.author}?`)) {
			dispatch(remove(selectedBlog.id))
			navigate("/")
		}
	}

	return (
		<div>
			<h2>blogs</h2>

			{selectedBlog ? (
				<div>
					<h2>
						{selectedBlog.title} by {selectedBlog.author}
					</h2>
					<a href={`https://${selectedBlog.url}`}>{selectedBlog.url}</a>
					<div>
						{selectedBlog.likes} likes
						<button onClick={addLike}>like</button>
					</div>
					<div>added by {selectedBlog.user.name}</div>
					{user.username === selectedBlog.user.username && <button onClick={deleteBlog}>remove</button>}
				</div>
			) : (
				<p>This blog does not exist</p>
			)}
		</div>
	)
}

export default BlogInfo
