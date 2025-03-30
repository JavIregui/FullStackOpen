import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { showError } from "../reducers/notificationReducer"
import { initializeUsers } from "../reducers/usersReducer"
import { Link } from "react-router-dom"

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
		<div>
			<h2>blogs</h2>

			<h2>Users</h2>

			{users && users.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th></th>
							<th>blogs created</th>
						</tr>
					</thead>
					<tbody>
						{users.map((u) => (
							<tr key={u.id}>
								<td>
									<Link to={`/users/${u.id}`}>{u.name}</Link>
								</td>
								<td>{u.blogs.length}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No users available</p>
			)}
		</div>
	)
}

export default Users
