const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '')
	}
	return null
}

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

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	
	const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
	if (!decodedToken.id) {
		return response.status(401).json({ error: 'token missing or invalid' })
	}
	const user = await User.findById(decodedToken.id)

	// Will it break tests?
	if (!user) {
		return response.status(401).end()
	}
	//

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
		user: body.user || existingBlog.user,
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