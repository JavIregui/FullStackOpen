import { useSelector } from "react-redux"
import styled from "styled-components"

const Message = styled.div`
	color: white;
	background: #4caf50;
	font-family: "Verdana", sans-serif;
	font-size: 14px;
	font-weight: bold;
	text-transform: uppercase;
	padding: 15px;
	margin: 10px 0;
`
const Error = styled(Message)`
	background: #d14747;
`

const Notification = () => {
	const { message, error } = useSelector((state) => state.notification)

	if (message === null) {
		return null
	}

	if (error) {
		return <Error>{message}</Error>
	}
	return <Message>{message}</Message>
}

export default Notification
