const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
    const maxLikes = Math.max(...blogs.map(blog => blog.likes))
    const blog = blogs.find(blog => blog.likes === maxLikes)

    return blog === undefined ? null : blog
}

module.exports = {
    totalLikes,
    favoriteBlog
}