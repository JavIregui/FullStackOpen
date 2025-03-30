import React, { useEffect } from "react"
import { useMatch } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { initializeUsers } from "../reducers/usersReducer"

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
		<div>
			<h2>blogs</h2>

			{selectedUser ? (
				<div>
					<h2>{selectedUser.name}</h2>
					<h3>added blogs</h3>
					<ul>
						{selectedUser.blogs.map((blog) => (
							<li key={blog.id}>{blog.title}</li>
						))}
					</ul>
				</div>
			) : (
				<p>This user does not exist</p>
			)}
		</div>
	)
}

export default User
