import React, { useState, useEffect } from "react"
import { useMatch, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { remove, like, initializeBlogs, addComment } from "../reducers/blogReducer"

import styled from "styled-components"

const BlogContainer = styled.div`
	padding: 20px 40px;
	background-color: darkgray;
`
const Title = styled.h2`
	font-family: "Verdana", sans-serif;
	text-transform: uppercase;
	color: white;
	font-size: 24px;
	margin-bottom: 20px;
`
const Subtitle = styled.h3`
	font-family: "Verdana", sans-serif;
	text-transform: uppercase;
	color: white;
	font-size: 20px;
	margin-bottom: 10px;
`
const Paragraph = styled.p`
	font-family: "Verdana", sans-serif;
	text-transform: uppercase;
	color: white;
	font-size: 14px;
`
const Website = styled.a`
	font-family: "Verdana", sans-serif;
	color: lightgray;
	font-size: 14px;
	text-decoration: underline;
	margin-bottom: 10px;
	display: block;
`
const Attribute = styled.div`
	font-family: "Verdana", sans-serif;
	color: lightgray;
	font-size: 14px;
	margin-bottom: 10px;
`
const Comment = styled.li`
	font-family: "Verdana", sans-serif;
	color: lightgray;
	font-size: 14px;
	margin-bottom: 10px;
`
const Input = styled.input`
	padding: 10px;
	border: none;
	background-color: white;
	font-size: 14px;
	font-family: "Verdana", sans-serif;
	color: lightgray;
	&:focus {
		outline: none;
		border: 2px solid #4caf50;
		background-color: white;
	}
`
const Button = styled.button`
	border: none;
	color: white;
	padding: 10px 20px;
	font-size: 14px;
	font-weight: bold;
	text-transform: uppercase;
	cursor: pointer;
	margin-left: 10px;
	background-color: #4caf50;
	&:hover {
		background-color: #45a049;
	}
`
const RemoveButton = styled(Button)`
	margin-left: 0;
	background: #d14747;
	&:hover {
		background-color: rgb(174, 55, 55);
	}
`

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
		<BlogContainer>
			<Title>blogs</Title>

			{selectedBlog ? (
				<div>
					<Subtitle>
						{selectedBlog.title} by {selectedBlog.author}
					</Subtitle>
					<Website href={`https://${selectedBlog.url}`}>{selectedBlog.url}</Website>
					<Attribute>
						{selectedBlog.likes} likes
						<Button onClick={addLike}>like</Button>
					</Attribute>
					<Attribute>added by {selectedBlog.user.name}</Attribute>
					<Subtitle>comments</Subtitle>
					<form onSubmit={handleComment}>
						<Input
							type='text'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder='Add a comment'
						/>
						<Button type='submit'>add comment</Button>
					</form>
					<ul>
						{selectedBlog.comments.map((comment) => (
							<Comment key={comment}>{comment}</Comment>
						))}
					</ul>
					{user.username === selectedBlog.user.username && <RemoveButton onClick={deleteBlog}>remove</RemoveButton>}
				</div>
			) : (
				<Paragraph>This blog does not exist</Paragraph>
			)}
		</BlogContainer>
	)
}

export default BlogInfo
