import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { showNotification, showError } from "../reducers/notificationReducer"
import { logoutUser } from "../reducers/userReducer"
import { initializeUsers } from "../reducers/usersReducer"

const Users = () => {
	const user = useSelector((state) => state.user)
	const users = useSelector((state) => state.users)
	const dispatch = useDispatch()

	useEffect(() => {
		try {
			dispatch(initializeUsers())
		} catch (exception) {
			dispatch(showError("Failed to fetch data from server", 3))
		}
	}, [])

	const handleLogout = () => {
		dispatch(logoutUser())
		dispatch(showNotification("logged out successfully", 3))
	}

	return (
		<div>
			<h2>blogs</h2>

			<p>
				{user.name} logged in <button onClick={handleLogout}>logout</button>
			</p>

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
								<td>{u.name}</td>
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
