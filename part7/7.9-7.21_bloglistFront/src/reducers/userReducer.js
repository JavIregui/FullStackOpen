import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import loginService from "../services/login"

const userSlice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload
		},
	},
})

export const { setUser } = userSlice.actions

export const checkLogin = () => {
	return (dispatch) => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			dispatch(setUser(user))
			blogService.setToken(user.token)
		} else {
			dispatch(setUser(null))
			blogService.setToken(null)
		}
	}
}

export const loginUser = (username, password) => {
	return async (dispatch) => {
		const user = await loginService.login({
			username,
			password,
		})

		window.localStorage.setItem("loggedUser", JSON.stringify(user))
		blogService.setToken(user.token)

		dispatch(setUser(user))

		return user
	}
}

export const logoutUser = () => {
	return (dispatch) => {
		window.localStorage.removeItem("loggedUser")
		dispatch(setUser(null))
		blogService.setToken(null)
	}
}

export default userSlice.reducer
