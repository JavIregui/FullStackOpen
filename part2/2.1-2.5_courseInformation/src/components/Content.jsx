import Part from "./Part"

const Content = ({parts}) => {

	const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

	return (
		<div>
			{parts.map(part => 
                <Part key={part.id} part={part} bold={false} />
            )}
            <Part part={{name: "Total number of exercises", exercises: totalExercises}} bold={true}/>
		</div>
	)
}

export default Content