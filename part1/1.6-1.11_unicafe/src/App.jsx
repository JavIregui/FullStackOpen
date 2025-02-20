import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text, value}) => <p>{text}: {value}</p>

const Statistics = ({statistics}) => {
  return (
    <div>
      <Statistic text='good' value={statistics.good}/>
      <Statistic text='neutral' value={statistics.neutral}/>
      <Statistic text='bad' value={statistics.bad}/>
      <Statistic text='all' value={statistics.good + statistics.neutral + statistics.bad}/>
      <Statistic text='average' value={(statistics.good - statistics.bad) / (statistics.good + statistics.neutral + statistics.bad)}/>
      <Statistic text='positive' value={statistics.good / (statistics.good + statistics.neutral + statistics.bad) * 100 + ' %'}/>
    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title='give feedback'/>
      <Button text='good' handleClick={() => setGood(good + 1)}/>
      <Button text='neutral' handleClick={() => setNeutral(neutral + 1)}/>
      <Button text='bad' handleClick={() => setBad(bad + 1)}/>
      <Title title='statistics'/>
      <Statistics statistics={{good, neutral, bad}}/>
    </div>
  )
}

export default App