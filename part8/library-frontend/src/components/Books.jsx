import { useQuery } from "@apollo/client"
import { GET_BOOKS } from "../queries"

const Books = (props) => {
	const query = useQuery(GET_BOOKS)

	const books = query.data ? query.data.allBooks : []

	if (!props.show) {
		return null
	}

	if (query.loading) {
		return <div>loading...</div>
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Books
