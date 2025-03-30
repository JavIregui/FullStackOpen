import React, { useEffect } from "react"
import { useMatch } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { initializeUsers } from "../reducers/usersReducer"

import styled from "styled-components"

const Container = styled.div`
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
const Subtitle2 = styled.h4`
	font-family: "Verdana", sans-serif;
	text-transform: uppercase;
	color: white;
	font-size: 16px;
	margin-bottom: 10px;
`
const ListItem = styled.li`
	font-family: "Verdana", sans-serif;
	color: lightgray;
	font-size: 14px;
	margin-bottom: 10px;
`

const User = () => {
	const dispatch = useDispatch()

	const users = useSelector((state) => state.users)
	useEffect(() => {
		if (users.length === 0) {
			dispatch(initializeUsers())
		}
	}, [])

	const match = useMatch("/users/:id")
	const selectedUserId = match ? match.params.id : null

	const selectedUser = users.find((user) => user.id === selectedUserId)

	return (
		<Container>
			<Title>blogs</Title>

			{selectedUser ? (
				<div>
					<Subtitle>{selectedUser.name}</Subtitle>
					<Subtitle2>added blogs</Subtitle2>
					<ul>
						{selectedUser.blogs.map((blog) => (
							<ListItem key={blog.id}>{blog.title}</ListItem>
						))}
					</ul>
				</div>
			) : (
				<p>This user does not exist</p>
			)}
		</Container>
	)
}

export default User
