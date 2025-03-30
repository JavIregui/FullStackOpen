import React, { useEffect, useRef } from "react"
import Blog from "./Blog"
import Notification from "./Notification"
import NewBlog from "./NewBlog"
import Togglable from "./Togglable"

import { useDispatch, useSelector } from "react-redux"
import { showError } from "../reducers/notificationReducer"
import { initializeBlogs } from "../reducers/blogReducer"

import styled from "styled-components"

const BlogListContainer = styled.div`
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
const Paragraph = styled.p`
	font-family: "Verdana", sans-serif;
	text-transform: uppercase;
	color: white;
	font-size: 14px;
`

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
		<BlogListContainer>
			<Title>blogs App</Title>

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
				<Paragraph>No blogs available</Paragraph>
			)}
		</BlogListContainer>
	)
}

export default BlogList
