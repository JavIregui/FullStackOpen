import React from "react"
import { Link } from "react-router-dom"

import styled from "styled-components"

const BlogContainer = styled.div`
	padding: 10px;
	padding-left: 25px;
	margin-bottom: 5px;
	background-color: lightgray;
`

const BlogLink = styled(Link)`
	font-family: "Verdana", sans-serif;
	font-size: 14px;
	text-decoration: none;
	color: gray;
	&:hover {
		text-decoration: underline;
	}
`

const Blog = ({ blog }) => {
	return (
		<BlogContainer>
			<BlogLink to={`/blogs/${blog.id}`}>
				{blog.title} by {blog.author}
			</BlogLink>
		</BlogContainer>
	)
}

export default Blog
