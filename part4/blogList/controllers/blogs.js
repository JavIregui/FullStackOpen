const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate('user', { username: 1, name: 1 })
	response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
		.populate('user', { username: 1, name: 1 })
	if (blog) {
		response.json(blog)
	}
	else {
		response.status(404).end()
	}
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	const body = request.body
	const user = request.user

	if (!user) {
		return response.status(401).end()
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		user: user.id,
		url: body.url,
		likes: body.likes || 0,
	})

	const savedBlog = await blog.save()

	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	const populatedBlog = await Blog.findById(savedBlog._id)
		.populate('user', { username: 1, name: 1 });

	response.status(201).json(populatedBlog)
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
		user: body.user || existingBlog.user,
		url: body.url || existingBlog.url,
		likes: body.likes || existingBlog.likes,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
		.populate('user', { username: 1, name: 1 })
	response.json(updatedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (!blog) {
		return response.status(404).end()
	}

	const user = request.user

	if (!user || blog.user.toString() !== user.id.toString()) {
		return response.status(401).end()
	}

	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

module.exports = blogsRouter