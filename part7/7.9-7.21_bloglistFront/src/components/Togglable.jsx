import { useState, forwardRef, useImperativeHandle } from "react"

import styled from "styled-components"

const ToggleButton = styled.button`
	border: none;
	color: white;
	padding: 10px 20px;
	font-size: 14px;
	font-weight: bold;
	text-transform: uppercase;
	cursor: pointer;
	margin-bottom: 20px;
	background-color: #4caf50;
	&:hover {
		background-color: #45a049;
	}
`

const Togglable = forwardRef(({ children, ...props }, refs) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? "none" : "" }
	const showWhenVisible = { display: visible ? "" : "none" }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div>
			<div style={hideWhenVisible}>
				<ToggleButton onClick={toggleVisibility}>{props.buttonLabel}</ToggleButton>
			</div>
			<div
				style={showWhenVisible}
				className='togglableContent'
			>
				{children}
				<ToggleButton onClick={toggleVisibility}>cancel</ToggleButton>
			</div>
		</div>
	)
})

Togglable.displayName = "Togglable"

export default Togglable
