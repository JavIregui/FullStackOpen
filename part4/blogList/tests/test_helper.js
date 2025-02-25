const Blog = require('../models/blog')

const initialBlogs = [
	{
		'title': 'HTML1',
		'author': 'Me',
		'url': 'test.com/1',
		'likes': 12
	},
	{
		'title': 'Blog2',
		'author': 'You',
		'url': 'test.com/2',
		'likes': 20
	},
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'id test',
		author: 'Me',
		url: 'test.com/200',
		likes: 10
	})
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()
}

module.exports = {
	initialBlogs,
	blogsInDb,
	nonExistingId
}