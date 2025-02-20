import { useState } from 'react'

const Title = ({ text }) => <h1>{text}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.'
	]

	const [selected, setSelected] = useState(0)
	const [mostVoted, setMostVoted] = useState(0)
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

	const randomAnecdote = () => {
		let random = selected
		while (random === selected) {
			random = Math.floor(Math.random() * anecdotes.length)
		}
		setSelected(random)
	}

	const voteAnecdote = () => {
		const copy = [...votes]
		copy[selected] += 1
		setVotes(copy)

		const max = Math.max(...copy)
        const maxIndex = copy.indexOf(max)
        setMostVoted(maxIndex)
	}

	return (
		<div>
			<Title text="Anecdote of the day" />
			<p>{anecdotes[selected]}</p>
			<p>has {votes[selected]} votes</p>

			<Button text="vote" handleClick={voteAnecdote} />
			<Button text="next anecdote" handleClick={randomAnecdote} />

			<Title text="Anecdote with most votes" />
			<p>{anecdotes[mostVoted]}</p>
			<p>has {votes[mostVoted]} votes</p>
		</div>
	)
}

export default App