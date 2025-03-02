import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import blogService from '../services/blogs'

vi.mock('../services/blogs')

describe('<Blog />', () => {

    test('renders title and author but does not render url and likes', async () => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'test',
            url: 'www.test.com',
            likes: 0,
            user: {
                username: 'testUser',
                name: 'Test Name'
            }
        }

        const loggedUser = {
            username: 'testUser',
            name: 'Test Name'
        }

        render(<Blog blog={blog} user={loggedUser} />)

        userEvent.setup()

        const header = screen.getByText('Component testing is done with react-testing-library test')
        expect(header).toBeDefined()

        const url = screen.queryByText('www.test.com')
        expect(url).toBeNull()

        const likes = screen.queryByText('0 likes')
        expect(likes).toBeNull()
    })

    test('renders url and likes when button is clicked', async () => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'test',
            url: 'www.test.com',
            likes: 0,
            user: {
                username: 'testUser',
                name: 'Test Name'
            }
        }

        const loggedUser = {
            username: 'testUser',
            name: 'Test Name'
        }

        render(<Blog blog={blog} user={loggedUser} />)

        userEvent.setup()
        const button = screen.getByText('view')
        await userEvent.click(button)

        const url = screen.queryByText('www.test.com')
        expect(url).toBeDefined()

        const likes = screen.queryByText('0 likes')
        expect(likes).toBeDefined()
    })

    test('calls addLike twice when like button is clicked twice', async () => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'test',
            url: 'www.test.com',
            likes: 0,
            user: {
                username: 'testUser',
                name: 'Test Name'
            }
        }

        const loggedUser = {
            username: 'testUser',
            name: 'Test Name'
        }

        const setBlogs = vi.fn()

        render(<Blog blog={blog} user={loggedUser} setBlogs={setBlogs} />)

        userEvent.setup()
        const viewButton = screen.getByText('view')
        await userEvent.click(viewButton)

        const likeButton = screen.getByText('like')
        await userEvent.click(likeButton)
        await userEvent.click(likeButton)

        expect(blogService.update).toHaveBeenCalledTimes(2)
        expect(setBlogs).toHaveBeenCalledTimes(2)
    })

    test('calls deleteBlog when remove button is clicked', async () => {
        const blog = {
            title: 'Component testing is done with react-testing-library',
            author: 'test',
            url: 'www.test.com',
            likes: 0,
            user: {
                username: 'testUser',
                name: 'Test Name'
            }
        }

        const loggedUser = {
            username: 'testUser',
            name: 'Test Name'
        }

        const setBlogs = vi.fn()

        const confirmSpy = vi.spyOn(window, 'confirm')
        confirmSpy.mockImplementation(() => true)

        render(<Blog blog={blog} user={loggedUser} setBlogs={setBlogs} />)

        userEvent.setup()
        const viewButton = screen.getByText('view')
        await userEvent.click(viewButton)

        const removeButton = screen.getByText('remove')
        await userEvent.click(removeButton)

        expect(blogService.remove).toHaveBeenCalledTimes(1)
        expect(setBlogs).toHaveBeenCalledTimes(1)

        confirmSpy.mockRestore()
    })
})