const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
	await User.deleteMany({})

	const passwordHash = await bcrypt.hash('password', 10)
	const user = new User({ username: 'root', name: 'Root User', passwordHash })

	await user.save()
})

describe('The Auth works', () => {
	describe('when there is initially one user in db', () => {

		test('users are returned as json', async () => {
			await api.get('/api/users')
				.expect(200)
				.expect('Content-Type', /application\/json/)
		})

		test('unique identifier property of the user posts is named id and not _id', async () => {
			const response = await api.get('/api/users')
			const users = response.body

			users.forEach(user => {
				assert(user.id)
				assert(!user._id)
			})
		})

		test('password or passwordHash are not returned but the rest of the data is', async () => {
			const response = await api.get('/api/users')
			const users = response.body

			users.forEach(user => {
				assert(!user.password)
				assert(!user.passwordHash)
				assert(user.username)
				assert(user.name)
				assert(user.id)
				assert(user.blogs)
			})
		})

		test('all users are returned', async () => {
			const response = await api.get('/api/users')

			assert.strictEqual(response.body.length, 1)
		})

		test('a specific user is within the returned users', async () => {
			const response = await api.get('/api/users')

			const names = response.body.map(r => r.name)
			assert(names.includes('Root User'))
		})

		describe('addition of a new user', () => {
			test('creation succeeds with a fresh username', async () => {
				const usersAtStart = await helper.usersInDb()
	
				const newUser = {
					username: 'newUser',
					name: 'New User',
					password: 'testpassword',
				}
	
				await api.post('/api/users')
					.send(newUser)
					.expect(201)
					.expect('Content-Type', /application\/json/)
	
				const usersAtEnd = await helper.usersInDb()
				assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
	
				const usernames = usersAtEnd.map(u => u.username)
				assert(usernames.includes(newUser.username))
			})
	
			test('creation fails with statuscode 400 if username already taken', async () => {
				const usersAtStart = await helper.usersInDb()
	
				const newUser = {
					username: 'root',
					name: 'New Root',
					password: 'testpassword',
				}
	
				const result = await api.post('/api/users')
					.send(newUser)
					.expect(400)
					.expect('Content-Type', /application\/json/)
	
				const usersAtEnd = await helper.usersInDb()
				assert(result.body.error.includes('expected `username` to be unique'))
	
				assert.strictEqual(usersAtEnd.length, usersAtStart.length)
			})

			test('fails with status code 400 if data invalid', async () => {
				const usersAtStart = await helper.usersInDb()

				const newUser = {
					name: 'New User',
					password: 'testpassword',
				}

				await api.post('/api/users')
					.send(newUser)
					.expect(400)

				const usersAtEnd = await helper.usersInDb()
				assert.deepStrictEqual(usersAtEnd, usersAtStart)
			})
		})
	})
})

describe('The REST API works', () => {
	describe('when there are some blogs saved initially', () => {

		let id;

		beforeEach(async () => {
			await Blog.deleteMany({})

			const users = await helper.usersInDb()
			const user = users[0]
			id = user.id
			
			const initialBlogs = await helper.initialBlogs(id)
			await Blog.insertMany(initialBlogs)

			// OR
			// const blogObjects = helper.initialBlogs
			//     .map(blog => new Blog(blog))
			// const promiseArray = blogObjects.map(blog => blog.save())
			// await Promise.all(promiseArray)
			// anotherr way to keep all promises

			// OR
			// for (let blog of helper.initialBlogs) {
			//     let blogObject = new Blog(blog)
			//     await blogObject.save()
			// }
			// to keep order of the blogs
		})

		test('blogs are returned as json', async () => {
			await api.get('/api/blogs')
				.expect(200)
				.expect('Content-Type', /application\/json/)
		})

		test('unique identifier property of the blog posts is named id and not _id', async () => {
			const response = await api.get('/api/blogs')
			const blogs = response.body

			blogs.forEach(blog => {
				assert(blog.id)
				assert(!blog._id)
			})
		})

		test('all blogs are returned', async () => {
			const response = await api.get('/api/blogs')

			assert.strictEqual(response.body.length, helper.blogs.length)
		})

		test('a specific blog is within the returned blogs', async () => {
			const response = await api.get('/api/blogs')

			const titles = response.body.map(r => r.title)
			assert(titles.includes(helper.blogs[0].title))
		})

		describe('viewing a specific blog', () => {

			test('succeeds with a valid id', async () => {
				const blogsAtStart = await helper.blogsInDb()

				const blogToView = blogsAtStart[0]

				const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
					.expect(200)
					.expect('Content-Type', /application\/json/)

				const blog = { ...blogToView, author: resultBlog.body.author }

				assert.deepStrictEqual(resultBlog.body, blog)
			})

			test('fails with statuscode 404 if blog does not exist', async () => {
				const validNonexistingId = await helper.nonExistingId(id)

				await api.get(`/api/blogs/${validNonexistingId}`)
					.expect(404)
			})

			test('fails with statuscode 400 id is invalid', async () => {
				const invalidId = '5a3d5da59070081a82a3445'

				await api.get(`/api/blogs/${invalidId}`)
					.expect(400)
			})
		})

		describe('addition of a new blog', () => {

			test('succeeds with valid data', async () => {
				const newBlog = {
					'title': 'BLOG3',
					'author': id,
					'url': 'test.com/3',
					'likes': 24
				}

				const resultBlog = await api.post('/api/blogs')
					.send(newBlog)
					.expect(201)
					.expect('Content-Type', /application\/json/)

				const blogsAtEnd = await helper.blogsInDb()
				assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)

				let blog = { ...newBlog, id: resultBlog.body.id }
				assert.deepStrictEqual(resultBlog.body, blog)
			})

			test('succeds with likes 0 if not specified', async () => {
				const newBlog = {
					'title': 'BLOG3',
					'author': id,
					'url': 'test.com/3',
				}

				const resultBlog = await api.post('/api/blogs')
					.send(newBlog)
					.expect(201)
					.expect('Content-Type', /application\/json/)

				assert.strictEqual(resultBlog.body.likes, 0)
			})

			test('fails with status code 400 if data invalid', async () => {
				const newBlog = {
					'title': 'BLOG3',
					'url': 'test.com/3',
					'likes': 24
				}

				await api
					.post('/api/blogs')
					.send(newBlog)
					.expect(400)

				const blogsAtEnd = await helper.blogsInDb()
				assert.strictEqual(blogsAtEnd.length, helper.blogs.length)
			})
		})

		describe('updating a blog', () => {

			test('succeeds with a valid id', async () => {
				const blogsAtStart = await helper.blogsInDb()
				const blogToUpdate = blogsAtStart[0]

				const newBlog = {
					'title': 'EditedBlog',
					'author': id,
					'url': 'EditedUrl',
					'likes': 100
				}

				const resultBlog = await api.put(`/api/blogs/${blogToUpdate.id}`)
					.send(newBlog)
					.expect(200)
					.expect('Content-Type', /application\/json/)

				let blog = { ...newBlog, id: resultBlog.body.id }
				assert.deepStrictEqual(resultBlog.body, blog)
			})

			test('succeeds with partial data', async () => {
				const blogsAtStart = await helper.blogsInDb()
				const blogToUpdate = blogsAtStart[0]

				const newBlog = {
					'title': 'EditedBlog',
					'author': id,
				}

				const resultBlog = await api.put(`/api/blogs/${blogToUpdate.id}`)
					.send(newBlog)
					.expect(200)
					.expect('Content-Type', /application\/json/)

				let blog = {
					...newBlog,
					id: resultBlog.body.id,
					'url': blogToUpdate.url,
					'likes': blogToUpdate.likes
				}
				assert.deepStrictEqual(resultBlog.body, blog)
			})

			test('fails with statuscode 404 if blog does not exist', async () => {
				const validNonexistingId = await helper.nonExistingId(id)

				await api.put(`/api/blogs/${validNonexistingId}`)
					.expect(404)
			})

			test('fails with statuscode 400 id is invalid', async () => {
				const invalidId = '5a3d5da59070081a82a3445'

				await api.put(`/api/blogs/${invalidId}`)
					.expect(400)
			})

		})

		describe('deletion of a blog', () => {
			test('succeeds with status code 204 if id is valid', async () => {
				const blogsAtStart = await helper.blogsInDb()
				const blogToDelete = blogsAtStart[0]

				await api.delete(`/api/blogs/${blogToDelete.id}`)
					.expect(204)

				const blogsAtEnd = await helper.blogsInDb()

				const titles = blogsAtEnd.map(r => r.title)
				assert(!titles.includes(blogToDelete.title))

				assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)
			})
		})

	})
})

after(async () => {
	await mongoose.connection.close()
})