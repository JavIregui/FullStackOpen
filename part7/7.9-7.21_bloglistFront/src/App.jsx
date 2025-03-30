import { useEffect } from "react"
import Login from "./components/Login"
import BlogList from "./components/BlogList"

import { useDispatch, useSelector } from "react-redux"
import { checkLogin } from "./reducers/userReducer"

const App = () => {
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(checkLogin())
	}, [])

	return <>{user === null ? <Login /> : <BlogList />}</>
}

export default App
