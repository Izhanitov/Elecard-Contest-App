import { useState, useEffect } from "react";

import Spinner from "../spinner/spinner";

const CardsView = ({ data }) => {
	const [cardsData, setCardsData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [pages, setPages] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		CreateCardsData(data);
	}, [data]);

	const CreateCardsData = (cards) => {
		setCardsData(
			cards.map((card) => {
				const { image, filesize, timestamp, category } = card;
				const visible = CheckLocalStorage(image);

				return {
					name: image,
					filesize,
					timestamp,
					category,
					visible,
				};
			})
		);
		setIsLoaded(true);
	};

	const Pagination = () => {
		setPages(Math.floor(cardsData.length + 50 - 1 / 50));
	};

	const ResetCardsVisible = () => {
		setCardsData(
			cardsData.map((card) => {
				localStorage.setItem(card.name, true);
				return { ...card, visible: "true" };
			})
		);
	};

	const HideCard = (event) => {
		setCardsData(
			cardsData.map((card) => {
				if (card.name === event.target.id) {
					card.visible = "false";
					localStorage.setItem(card.name, false);
					return { ...card, visible: "false" };
				}
				return card;
			})
		);
	};

	useEffect(() => console.log(cardsData), [cardsData]);

	const CheckLocalStorage = (cardName) => {
		if (!localStorage.getItem(cardName)) {
			localStorage.setItem(cardName, true);
			return true;
		} else return localStorage.getItem(cardName);
	};

	const RenderCards = () => {
		return cardsData
			.filter((item) => item.visible === "true")
			.map((item) => (
				<div key={item.name} className="col">
					<button id={item.name} onClick={HideCard}>
						X
					</button>
					<img
						src={`http://contest.elecard.ru/frontend_data/${item.name}`}
						alt={item.name}
					/>
				</div>
			));
	};

	const SortCardsData = (type) => {
		let newT = [].concat(cardsData);

		switch (type) {
			case "category":
				newT.sort((a, b) =>
					a.category > b.category ? 1 : b.category > a.category ? -1 : 0
				);
				break;
			case "timestamp":
				newT.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
				break;
			case "name":
				newT.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
				break;
			case "filesize":
				newT.sort((a, b) => parseInt(a.filesize) - parseInt(b.filesize));
				break;
			default:
				break;
		}
		setCardsData(newT);
	};

	const SwitchSort = (event) => {
		SortCardsData(event.target.id);
	};

	return !isLoaded ? (
		<Spinner />
	) : (
		<div>
			<button onClick={ResetCardsVisible}>Показать скрытые</button>
			<input
				id="category"
				name="filter-radio"
				onClick={SwitchSort}
				type="radio"
			/>
			Категория
			<input
				id="timestamp"
				name="filter-radio"
				onClick={SwitchSort}
				type="radio"
			/>
			Дата
			<input id="name" name="filter-radio" onClick={SwitchSort} type="radio" />
			Название
			<input
				id="filesize"
				name="filter-radio"
				onClick={SwitchSort}
				type="radio"
			/>
			Размер
			<div className="row">{RenderCards()}</div>
		</div>
	);
};

export default CardsView;
