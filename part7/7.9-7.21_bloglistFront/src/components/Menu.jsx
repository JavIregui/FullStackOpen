import React from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../reducers/userReducer"
import { showNotification } from "../reducers/notificationReducer"

import styled from "styled-components"

const MenuContainer = styled.div`
	background-color: lightgrey;
	padding: 20px;
	padding-left: 40px;
	margin-bottom: 10px;
	font-family: "Verdana", sans-serif;
	font-size: 14px;
	color: gray;
`
const MenuLink = styled(Link)`
	margin-right: 25px;
	text-decoration: none;
	color: black;
	text-transform: uppercase;
	&:hover {
		text-decoration: underline;
	}
`
const MenuButton = styled.button`
	background-color: gray;
	color: white;
	margin-left: 10px;
	padding: 5px 10px;
	border: none;
	cursor: pointer;
	text-transform: uppercase;

	&:hover {
		background-color: darkgray;
	}
`

const Menu = () => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logoutUser())

		dispatch(showNotification("logged out successfully", 3))
	}

	return (
		<MenuContainer>
			<MenuLink to='/'>blogs</MenuLink>
			<MenuLink to='/users'>users</MenuLink>
			{user.name} logged in <MenuButton onClick={handleLogout}>logout</MenuButton>
		</MenuContainer>
	)
}

export default Menu
