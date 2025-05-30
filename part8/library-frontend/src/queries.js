import { gql } from "@apollo/client"

export const GET_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`
export const GET_BOOKS = gql`
	query {
		allBooks {
			title
			published
			author
		}
	}
`
export const CREATE_BOOK = gql`
	mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
		addBook(title: $title, published: $published, author: $author, genres: $genres) {
			title
			published
			author
		}
	}
`
export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
			bookCount
		}
	}
`
