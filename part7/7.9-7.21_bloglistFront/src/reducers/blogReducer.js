import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		likeBlog(state, action) {
			const id = action.payload
			const blogToChange = state.find((b) => b.id === id)
			const changedBlog = {
				...blogToChange,
				likes: blogToChange.likes + 1,
			}

			return state.map((blog) => (blog.id !== id ? blog : changedBlog))
		},
		appendBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action) {
			return action.payload
		},
		removeBlog(state, action) {
			return state.filter((blog) => blog.id !== action.payload)
		},
	},
})

export const { likeBlog, appendBlog, setBlogs, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = (blog) => {
	return async (dispatch) => {
		const newBlog = await blogService.create(blog)
		dispatch(appendBlog(newBlog))
	}
}

export const remove = (id) => {
	return async (dispatch) => {
		await blogService.remove(id)
		dispatch(removeBlog(id))
	}
}

export const like = (id, info) => {
	return async (dispatch) => {
		await blogService.update(id, info)
		dispatch(likeBlog(id))
	}
}

export default blogSlice.reducer
