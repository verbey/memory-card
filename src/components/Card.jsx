import '../styles/Card.css';

function Card(props) {

	return (

		<div className='card'>
			<img src={props.src} alt={props.alt} />
			<p className='cardDescription'>{props.description}</p>
		</div>
	);
}

export default Card;
