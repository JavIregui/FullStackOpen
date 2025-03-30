import { render, screen, waitFor } from '@testing-library/react'
import NewBlog from './NewBlog'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

describe('<NewBlog />', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	test('updates parent state, queries backend and sets notification', async () => {
		const createBlog = vi.fn()
		const setMessage = vi.fn()
		const setError = vi.fn()
		const toggleRef = { current: { toggleVisibility: vi.fn() } }
		const user = userEvent.setup()

		blogService.create.mockResolvedValue({
			title: 'testing title',
			author: 'testing author',
			url: 'testing url',
			likes: 0,
			id: '12345'
		})

		render(
			<NewBlog
				setBlogs={createBlog}
				setMessage={setMessage}
				setError={setError}
				toggleRef={toggleRef}
			/>
		)

		const titleInput = screen.getByPlaceholderText('blog title...')
		const authorInput = screen.getByPlaceholderText('by...')
		const urlInput = screen.getByPlaceholderText('found at...')
		const sendButton = screen.getByRole('button')

		await user.type(titleInput, 'testing title')
		await user.type(authorInput, 'testing author')
		await user.type(urlInput, 'testing url')
		await user.click(sendButton)

		expect(createBlog).toHaveBeenCalledTimes(1)

		await waitFor(() => {
			expect(blogService.create).toHaveBeenCalledTimes(1)
			expect(blogService.create).toHaveBeenCalledWith({
				title: 'testing title',
				author: 'testing author',
				url: 'testing url'
			})
		})

		expect(setMessage).toHaveBeenCalledWith('a new blog testing title by testing author added')
		expect(setError).toHaveBeenCalledWith(false)
		expect(toggleRef.current.toggleVisibility).toHaveBeenCalledTimes(1)
	})

	test('fails with incomplete information and handles error correctly', async () => {
		const createBlog = vi.fn()
		const setMessage = vi.fn()
		const setError = vi.fn()
		const toggleRef = { current: { toggleVisibility: vi.fn() } }
		const user = userEvent.setup()

		blogService.create.mockRejectedValue('')

		render(
			<NewBlog
				setBlogs={createBlog}
				setMessage={setMessage}
				setError={setError}
				toggleRef={toggleRef}
			/>
		)

		const titleInput = screen.getByPlaceholderText('blog title...')
		const urlInput = screen.getByPlaceholderText('found at...')
		const sendButton = screen.getByRole('button')

		await user.type(titleInput, 'testing title')
		await user.type(urlInput, 'testing url')
		await user.click(sendButton)

		expect(createBlog).not.toHaveBeenCalled()

		await waitFor(() => {
			expect(blogService.create).not.toHaveBeenCalledTimes()
		})

		expect(setMessage).toHaveBeenCalledWith('please fill all fields')
		expect(setError).toHaveBeenCalledWith(true)
		expect(toggleRef.current.toggleVisibility).not.toHaveBeenCalled()
	})
})