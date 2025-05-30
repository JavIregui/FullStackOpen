import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createAnecdote = async (content) => {
    const response = await axios.post(baseUrl, {content, votes: 0})
    return response.data
}

export const voteAnecdote = async (updatedNote) => {
    const response = await axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote)
    return response.data
}