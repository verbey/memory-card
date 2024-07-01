import '../styles/Card.css';

function Card(props) {

	return (

		<div className='card'>
			<img src={props.src} />
			<p className='cardDescription'>{props.description}</p>
			<div className="overlay"></div>
		</div>
	);
}

export default Card;
