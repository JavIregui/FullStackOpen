import { useEffect } from "react"
import Login from "./components/Login"
import BlogList from "./components/BlogList"
import Users from "./components/Users"
import User from "./components/User"
import Menu from "./components/Menu"
import BlogInfo from "./components/BlogInfo"

import { useDispatch, useSelector } from "react-redux"
import { checkLogin } from "./reducers/userReducer"

import { Routes, Route } from "react-router-dom"

const App = () => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(checkLogin())
	}, [])

	return (
		<Routes>
			<Route
				path='/'
				element={
					user === null ? (
						<Login />
					) : (
						<>
							<Menu />
							<BlogList />
						</>
					)
				}
			/>
			<Route
				path='/users'
				element={
					user === null ? (
						<Login />
					) : (
						<>
							<Menu />
							<Users />
						</>
					)
				}
			/>
			<Route
				path='/users/:id'
				element={
					user === null ? (
						<Login />
					) : (
						<>
							<Menu />
							<User />
						</>
					)
				}
			/>
			<Route
				path='/blogs/:id'
				element={
					user === null ? (
						<Login />
					) : (
						<>
							<Menu />
							<BlogInfo />
						</>
					)
				}
			/>
		</Routes>
	)
}

export default App
