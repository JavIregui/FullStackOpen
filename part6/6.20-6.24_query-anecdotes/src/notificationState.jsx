import { createContext, useReducer, useContext, useRef } from "react"

export const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'CLEAR':
            return ''
        case 'NEW':
            return `New anecdote '${action.payload}' created`
        case 'VOTE':
            return `anecdote '${action.payload}' voted`
        case 'ERROR':
            return `${action.payload}`
        default:
            return state
    }
}

export const NotificationContext = createContext()

export const NotificationProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    const dispatch = notificationAndDispatch[1]
    const timeoutIdRef = useRef(null)

    const enhancedDispatch = (action) => {
        dispatch(action)
        if (action.type !== 'CLEAR') {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(() => {
                dispatch({ type: 'CLEAR' })
                timeoutIdRef.current = null
            }, 5000)
        }
    }

    return enhancedDispatch
}