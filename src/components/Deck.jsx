import '../styles/Deck.css';
import Card from './Card.jsx';
import { useEffect, useState } from "react";

function Deck() {
	const [cardList, setCardList] = useState([]);
	const [currentScore, setCurrentScore] = useState(0);
	const [bestScore, setBestScore] = useState(0);

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
						description: `${data.data[i].title} by ${data.data[i].artist_title}`
					});
				}

				setCardList(newCardList);
			});
	}, []);

	function shuffleCards() {

	}

	let cardComponentsList = [];
	cardList.forEach((card, i) => {
		cardComponentsList.push(<Card key={i} src={card.src} description={card.description} />);
	});

	return (
		<div className="deck">
			<div className="cardsContainer">{cardComponentsList}</div>
			<div className="infoContainer">
				<div className="rules">Each time you pick a card, the deck gets shuffled. Pick a card that you didn't choose before to gain a point.</div>
				<div className="currentScore">Current score: {currentScore}</div>
				<div className="bestScore">Best score: {bestScore}</div>
			</div>
		</div>
	);
}

export default Deck;
