const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('The REST API works', () => {
	describe('when there are some blogs saved initially', () => {

		beforeEach(async () => {
			await Blog.deleteMany({})

			await Blog.insertMany(helper.initialBlogs)

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

			assert.strictEqual(response.body.length, helper.initialBlogs.length)
		})

		test('a specific blog is within the returned blogs', async () => {
			const response = await api.get('/api/blogs')

			const titles = response.body.map(r => r.title)
			assert(titles.includes(helper.initialBlogs[0].title))
		})

		describe('viewing a specific blog', () => {

			test('succeeds with a valid id', async () => {
				const blogsAtStart = await helper.blogsInDb()

				const blogToView = blogsAtStart[0]

				const resultBlog = await api.get(`/api/blogs/${blogToView.id}`)
					.expect(200)
					.expect('Content-Type', /application\/json/)

				assert.deepStrictEqual(resultBlog.body, blogToView)
			})

			test('fails with statuscode 404 if blog does not exist', async () => {
				const validNonexistingId = await helper.nonExistingId()

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
					'author': 'Me',
					'url': 'test.com/3',
					'likes': 24
				}

				const resultBlog = await api.post('/api/blogs')
					.send(newBlog)
					.expect(201)
					.expect('Content-Type', /application\/json/)

				const blogsAtEnd = await helper.blogsInDb()
				assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

				let blog = { ...newBlog, id: resultBlog.body.id }
				assert.deepStrictEqual(resultBlog.body, blog)
			})

			test('succeds with likes 0 if not specified', async () => {
				const newBlog = {
					'title': 'BLOG3',
					'author': 'Me',
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
				assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
			})
		})

		describe('updating a blog', () => {

			test('succeeds with a valid id', async () => {
				const blogsAtStart = await helper.blogsInDb()
				const blogToUpdate = blogsAtStart[0]

				const newBlog = {
					'title': 'EditedBlog',
					'author': 'EditedAuthor',
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
					'author': 'EditedAuthor',
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
				const validNonexistingId = await helper.nonExistingId()

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

				assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
			})
		})

	})
})

after(async () => {
	await mongoose.connection.close()
})