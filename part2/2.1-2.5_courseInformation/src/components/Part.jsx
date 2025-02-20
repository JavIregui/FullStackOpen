const Part = ({part, bold}) => {
    if(bold){
        return (
            <p><strong>{part.name}: {part.exercises}</strong></p>
        )
    }
	return (
		<p>{part.name}: {part.exercises}</p>
	)
}

export default Part