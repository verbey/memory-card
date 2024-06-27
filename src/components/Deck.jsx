import '../styles/Deck.css';
import Card from './Card.jsx';
import { useEffect, useState } from "react";

function Deck() {
	const [cardList, setCardList] = useState([]);

	useEffect(() => {
		const newCardList = [];
		fetch('https://api.artic.edu/api/v1/artworks?limit=12', { mode: 'cors' })
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				for (let i = 0; i < 12; i++) {
					newCardList.push({
						src: `https://www.artic.edu/iiif/2/${data.data[i].image_id}/full/400,/0/default.jpg`,
						alt: `${data.data[i].title} by ${data.data[i].artist_title}`,
						description: `${data.data[i].title} by ${data.data[i].artist_title}`
					});
				}

				setCardList(newCardList);
			});
	}, []);

	let cardComponentsList = [];
	cardList.forEach((card, i) => {
		cardComponentsList.push(<Card key={i} src={card.src} alt={card.alt} description={card.description} />);
	});

	return (
		<div className="deck">
			<div className="cardsContainer">{cardComponentsList}</div>
			<div className="infoContainer">
				<div className="rules"></div>
				<div className="currentScore"></div>
				<div className="bestScore"></div>
			</div>
		</div>
	);
}

export default Deck;
