import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR, GET_BOOKS, GET_AUTHORS } from "../queries"

const EditAuthor = ({ authors }) => {
	const [name, setName] = useState("")
	const [born, setBorn] = useState("")

	const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: GET_BOOKS }, { query: GET_AUTHORS }],
	})

	const submit = async (event) => {
		event.preventDefault()

		editAuthor({ variables: { name, setBornTo: Number(born) } })

		setName("")
		setBorn("")
	}

	useEffect(() => {
		if (result.data && result.data.editAuthor === null) {
			alert(`Author ${name} not found`)
		}
	}, [result.data])

	return (
		<div>
			<h2>Set birthyear</h2>

			<form onSubmit={submit}>
				<div>
					name
					<select
						value={name}
						onChange={({ target }) => setName(target.value)}
					>
						<option
							value=''
							disabled
						>
							Select author
						</option>
						{authors.map((author) => (
							<option
								key={author.name}
								value={author.name}
							>
								{author.name}
							</option>
						))}
					</select>
				</div>
				<div>
					born
					<input
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>

				<button type='submit'>update author</button>
			</form>
		</div>
	)
}

export default EditAuthor
