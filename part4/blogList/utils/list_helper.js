const lodash = require('lodash')

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    const blog = blogs.find(blog => blog.likes === maxLikes)

    return blog === undefined ? null : blog
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return null
    }
    
    const blogsPerAuthor = lodash.countBy(blogs, 'author')
    const topAuthor = lodash.maxBy(lodash.keys(blogsPerAuthor), author => blogsPerAuthor[author])

    return {
        author: topAuthor,
        blogs: blogsPerAuthor[topAuthor]
    }
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs
}