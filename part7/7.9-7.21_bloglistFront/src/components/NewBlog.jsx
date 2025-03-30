import { useState } from "react"

import { useDispatch } from "react-redux"
import { showNotification, showError } from "../reducers/notificationReducer"
import { createBlog } from "../reducers/blogReducer"

import styled from "styled-components"

const Title = styled.h2`
	color: white;
	font-size: 18px;
	text-transform: uppercase;
	font-family: "Verdana", sans-serif;
	margin-bottom: 1rem;
`
const CreateButton = styled.button`
	border: none;
	color: white;
	padding: 10px 20px;
	font-size: 14px;
	font-weight: bold;
	text-transform: uppercase;
	cursor: pointer;
	margin-top: 20px;
	margin-bottom: 10px;
	background-color: #4caf50;
	&:hover {
		background-color: #45a049;
	}
`
const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	gap: 5px;
	font-size: 14px;
	font-family: "Verdana", sans-serif;
	color: lightgray;
	text-transform: uppercase;
`
const Input = styled.input`
	padding: 10px;
	border: none;
	background-color: white;
	font-size: 14px;
	font-family: "Verdana", sans-serif;
	color: lightgray;
	&:focus {
		outline: none;
		border: 2px solid #4caf50;
		background-color: white;
	}
`

const NewBlog = ({ toggleRef }) => {
	const dispatch = useDispatch()

	const [newTitle, setNewTitle] = useState("")
	const [newAuthor, setNewAuthor] = useState("")
	const [newUrl, setNewUrl] = useState("")

	const handleNewBlog = async (event) => {
		event.preventDefault()

		if (!newTitle || !newAuthor || !newUrl) {
			dispatch(showError("please fill all fields", 3))
			return
		}

		const blogObject = {
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		}

		try {
			dispatch(createBlog(blogObject))

			toggleRef.current.toggleVisibility()

			dispatch(showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 3))
		} catch (exception) {
			console.error(exception)
			dispatch(showError("failed to create new blog", 3))
		}

		setNewTitle("")
		setNewAuthor("")
		setNewUrl("")
	}

	return (
		<>
			<Title>create new</Title>
			<form onSubmit={handleNewBlog}>
				<InputContainer>
					title
					<Input
						type='text'
						value={newTitle}
						name='Title'
						onChange={({ target }) => setNewTitle(target.value)}
						placeholder='blog title...'
					/>
				</InputContainer>
				<InputContainer>
					author
					<Input
						type='text'
						value={newAuthor}
						name='Author'
						onChange={({ target }) => setNewAuthor(target.value)}
						placeholder='by...'
					/>
				</InputContainer>
				<InputContainer>
					url
					<Input
						type='text'
						value={newUrl}
						name='Url'
						onChange={({ target }) => setNewUrl(target.value)}
						placeholder='found at...'
					/>
				</InputContainer>
				<CreateButton type='submit'>create</CreateButton>
			</form>
		</>
	)
}

export default NewBlog
