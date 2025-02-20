import Part from "./Part"

const Content = ({parts}) => {

	let totalExercises = 0;
    parts.forEach(part => {
        totalExercises += part.exercises;
    });

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