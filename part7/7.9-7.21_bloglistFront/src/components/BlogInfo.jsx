import React, { useState, useEffect } from "react"
import { useMatch, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { remove, like, initializeBlogs, addComment } from "../reducers/blogReducer"

const BlogInfo = () => {
	const [comment, setComment] = useState("")
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

	const handleComment = async (event) => {
		event.preventDefault()
		dispatch(addComment(selectedBlog.id, comment))
		setComment("")
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
					<h3>comments</h3>
					<form onSubmit={handleComment}>
						<input
							type='text'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder='Add a comment'
						/>
						<button type='submit'>add comment</button>
					</form>
					<ul>
						{selectedBlog.comments.map((comment) => (
							<li key={comment}>{comment}</li>
						))}
					</ul>
					{user.username === selectedBlog.user.username && <button onClick={deleteBlog}>remove</button>}
				</div>
			) : (
				<p>This blog does not exist</p>
			)}
		</div>
	)
}

export default BlogInfo
