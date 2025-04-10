import { useQuery } from "@apollo/client"
import { GET_AUTHORS } from "../queries"

import EditAuthor from "./EditAuthor"

const Authors = (props) => {
	const query = useQuery(GET_AUTHORS)

	const authors = query.data ? query.data.allAuthors : []

	if (!props.show) {
		return null
	}

	if (query.loading) {
		return <div>loading...</div>
	}

	return (
		<div>
			<h2>authors</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<EditAuthor authors={authors} />
		</div>
	)
}

export default Authors
