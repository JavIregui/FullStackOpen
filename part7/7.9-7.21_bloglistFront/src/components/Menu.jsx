import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../reducers/userReducer"
import { showNotification } from "../reducers/notificationReducer"

const Menu = () => {
	const style = {
		backgroundColor: "lightgrey",
		padding: 10,
		marginBottom: 10,
	}

	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logoutUser())

		dispatch(showNotification("logged out successfully", 3))
	}

	return (
		<div style={style}>
			<Link to='/'>blogs</Link>
			<Link
				to='/users'
				style={{ marginLeft: 10, marginRight: 10 }}
			>
				users
			</Link>
			{user.name} logged in <button onClick={handleLogout}>logout</button>
		</div>
	)
}

export default Menu
