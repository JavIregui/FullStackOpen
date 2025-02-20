const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.parts[0].title}: {props.parts[0].exercices}</p>
      <p>{props.parts[1].title}: {props.parts[1].exercices}</p>
      <p>{props.parts[2].title}: {props.parts[2].exercices}</p>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Total number of exercises: {props.parts[0].exercices + props.parts[1].exercices + props.parts[2].exercices}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {title: 'Fundamentals of React', exercices: 10},
    {title: 'Using props to pass data', exercices: 7},
    {title: 'State of a component', exercices: 14}
  ]

  return (
    <>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </>
  )
}

export default App