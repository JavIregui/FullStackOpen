const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate('author', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
		.populate('author', { username: 1, name: 1 })
	if (blog) {
		response.json(blog)
	}
	else {
		response.status(404).end()
	}
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body

		const user = await User.findById(body.author)

		if(!user) {
			return response.status(400).end()
		}

		const blog = new Blog({
			title: body.title,
			author: user.id,
			url: body.url,
			likes: body.likes || 0,
		})

		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()

		response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
	const body = request.body

	const existingBlog = await Blog.findById(request.params.id)
	if (!existingBlog) {
		return response.status(404).end()
	}

	const blog = {
		title: body.title || existingBlog.title,
		author: body.author || existingBlog.author,
		url: body.url || existingBlog.url,
		likes: body.likes || existingBlog.likes,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

module.exports = blogsRouter