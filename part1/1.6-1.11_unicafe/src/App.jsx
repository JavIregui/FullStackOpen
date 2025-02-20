import { useState } from 'react'

const Title = ({ title }) => <h1>{title}</h1>

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}:</td>
			<td>{value}</td>
		</tr>
	)
}

const Statistics = ({ statistics }) => {
	if (statistics.good + statistics.neutral + statistics.bad === 0) {
		return <p>No feedback given</p>
	}
	return (
		<table>
			<tbody>
				<StatisticLine text='good' value={statistics.good} />
				<StatisticLine text='neutral' value={statistics.neutral} />
				<StatisticLine text='bad' value={statistics.bad} />
				<StatisticLine text='all' value={statistics.good + statistics.neutral + statistics.bad} />
				<StatisticLine text='average' value={(statistics.good - statistics.bad) / (statistics.good + statistics.neutral + statistics.bad)} />
				<StatisticLine text='positive' value={statistics.good / (statistics.good + statistics.neutral + statistics.bad) * 100 + ' %'} />
			</tbody>
		</table>
	)
}


const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<Title title='give feedback' />
			<Button text='good' handleClick={() => setGood(good + 1)} />
			<Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
			<Button text='bad' handleClick={() => setBad(bad + 1)} />
			<Title title='statistics' />
			<Statistics statistics={{ good, neutral, bad }} />
		</div>
	)
}

export default App