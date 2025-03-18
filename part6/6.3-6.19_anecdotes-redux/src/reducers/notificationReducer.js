import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setMessage(state, action) {
            return action.payload
        }
    }
})

export const { setMessage } = notificationSlice.actions

export const showNotification = (message, time) => {
    return async dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => {
            dispatch(setMessage(''))
        }, time * 1000)
    }
}

export default notificationSlice.reducer