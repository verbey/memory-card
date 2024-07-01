import '../styles/Deck.css';
import Card from './Card.jsx';
import 'animate.css';
import { useEffect, useState } from 'react';

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
						description: `${data.data[i].title} by ${data.data[i].artist_title}`,
						key: crypto.randomUUID(),
						clicked: false
					});
				}

				setCardList(newCardList);
			});
	}, []);

	function shuffleCards() {
		let tempCardList = cardList;
		let newCardList = [];
		for (let i = 0; i < 12; i++) {
			const randomIndex = Math.floor(Math.random() * tempCardList.length);
			newCardList.push(tempCardList[randomIndex]);
			tempCardList.splice(randomIndex, 1);
		}

		setCardList(newCardList);
	}

	async function handleCardClick(event) {
		const clickedImgSrc = event.target.parentElement.firstChild.src;

		let newCardList = cardList;
		const clickedCard = newCardList.find(card => card.src === clickedImgSrc);

		if (clickedCard.clicked) {
			event.target.parentElement.classList.add('animate__animated', 'animate__wobble');
			const animationPromise = (() => {
				return new Promise(resolve => {
					event.target.parentElement.addEventListener('animationend', () => {
						event.target.parentElement.classList.remove('animate__animated', 'animate__wobble');
						resolve();
					});
				});
			});
			await animationPromise().then(() => {
				setCurrentScore(0);
				newCardList = newCardList.map(card => card.clicked = false);
				setCardList(newCardList);
			});
		}

		else {
			clickedCard.clicked = true;
			setCurrentScore(currentScore + 1);
			if (currentScore + 1 > bestScore) {
				setBestScore(currentScore + 1);
				const bestScoreElement = document.querySelector('.bestScore');
				bestScoreElement.classList.add('animate__animated', 'animate__tada');
				bestScoreElement.addEventListener('animationend', () => {
					bestScoreElement.classList.remove('animate__animated', 'animate__tada');
				});
			}
			setCardList(newCardList);
		}

		shuffleCards();
	}

	let cardComponentsList = [];
	cardList.forEach(card => {
		cardComponentsList.push(<Card key={card.key} src={card.src} description={card.description} />);
	});

	return (
		<div className='deck animate__animated animate__backInRight' onClick={handleCardClick} >
			<div className='cardsContainer'>{cardComponentsList}</div>
			<div className='infoContainer'>
				<div className='rules'>Each time you pick a card, the deck gets shuffled. Pick a card that you didn't choose before to gain a point.</div>
				<div className='currentScore'>Current score: {currentScore}</div>
				<div className='bestScore'>Best score: {bestScore}</div>
			</div>
		</div>
	);
}

export default Deck;
