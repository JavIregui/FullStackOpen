import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, sortAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({filter, anecdotes}) => {
        return filter === ''
            ? anecdotes
            : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        dispatch(sortAnecdotes())
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList