import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { showError } from "../reducers/notificationReducer"
import { initializeUsers } from "../reducers/usersReducer"
import { Link } from "react-router-dom"

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
const TableTitle = styled.th`
	font-family: "Verdana", sans-serif;
	text-transform: uppercase;
	color: white;
	font-size: 14px;
`
const TableItem = styled.td`
	font-family: "Verdana", sans-serif;
	text-transform: uppercase;
	font-weight: regular;
	color: lightgray;
	font-size: 14px;
`
const Website = styled(Link)`
	font-family: "Verdana", sans-serif;
	color: lightgray;
	font-size: 14px;
	text-decoration: underline;
	margin-bottom: 10px;
	display: block;
`

const Users = () => {
	const users = useSelector((state) => state.users)
	const dispatch = useDispatch()

	useEffect(() => {
		try {
			dispatch(initializeUsers())
		} catch (exception) {
			dispatch(showError("Failed to fetch data from server", 3))
		}
	}, [])

	return (
		<Container>
			<Title>Users</Title>

			{users && users.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th></th>
							<TableTitle>blogs created</TableTitle>
						</tr>
					</thead>
					<tbody>
						{users.map((u) => (
							<tr key={u.id}>
								<td style={{ paddingRight: "25px" }}>
									<Website to={`/users/${u.id}`}>{u.name}</Website>
								</td>
								<TableItem>{u.blogs.length}</TableItem>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No users available</p>
			)}
		</Container>
	)
}

export default Users
