const Blog = require('../models/blog')
const User = require('../models/user')

const blogs = [
	{
		'title': 'HTML1',
		'author': 'Author1',
		'user': '',
		'url': 'test.com/1',
		'likes': 12
	},
	{
		'title': 'Blog2',
		'author': 'Author2',
		'user': '',
		'url': 'test.com/2',
		'likes': 20
	},
]

const initialBlogs = async (userId) => {
	const initialBlogs = blogs.map(blog => new Blog({
		title: blog.title,
		author: blog.author,
		user: userId,
		url: blog.url,
		likes: blog.likes
	}))
	return initialBlogs
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

const nonExistingId = async (userId) => {
	const blog = new Blog({
		title: 'id test',
		author: 'test author',
		user: userId,
		url: 'test.com/200',
		likes: 10
	})
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()
}

module.exports = {
	blogs,
	initialBlogs,
	blogsInDb,
	usersInDb,
	nonExistingId
}