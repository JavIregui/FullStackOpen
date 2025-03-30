import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
	name: "notification",
	initialState: { message: null, error: false },
	reducers: {
		setMessage(state, action) {
			return { ...state, message: action.payload }
		},
		setError(state, action) {
			return { ...state, error: action.payload }
		},
	},
})

export const { setMessage, setError } = notificationSlice.actions

export const showNotification = (message, time) => {
	return async (dispatch) => {
		dispatch(setError(false))
		dispatch(setMessage(message))
		setTimeout(() => {
			dispatch(setMessage(null))
		}, time * 1000)
	}
}

export const showError = (message, time) => {
	return async (dispatch) => {
		dispatch(setError(true))
		dispatch(setMessage(message))
		setTimeout(() => {
			dispatch(setMessage(null))
			dispatch(setError(false))
		}, time * 1000)
	}
}

export default notificationSlice.reducer
