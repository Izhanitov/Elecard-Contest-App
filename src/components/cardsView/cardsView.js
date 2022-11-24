import { useState, useEffect, useMemo } from "react";

import Spinner from "../spinner/spinner";
import usePagination from "../usePagination/usePagination";
import CardsViewPage from "../cardsViewPage/cardsViewPage";

const CardsView = ({ data }) => {
	const [cardsData, setCardsData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hiddenNames, setHiddenNames] = useState([]);

	const pagination = usePagination(cardsData.length - hiddenNames.length, 51);



	const itemsToView = useMemo(
		() => cardsData.filter(item => !hiddenNames.some(hidden => item.name === hidden)).slice(pagination.firstIndex, pagination.lastIndex + 1),
		[hiddenNames, pagination]
	);

	useEffect(() => {
		createCardsData(data);
	}, [data]);

	const createCardsData = (cards) => {
		setCardsData(
			cards.map((card) => {
				const { image, filesize, timestamp, category } = card;
				const visible = checkLocalStorage(image);

				return {
					name: image.split('/').pop(),
					filesize,
					timestamp,
					category,
					visible,
				};
			})
		);
		setIsLoaded(true);
	};

	const resetCardsVisible = () => {
		setHiddenNames([]);
		setCardsData(
			cardsData.map((card) => {
				localStorage.setItem(card.name, true);
				return { ...card, visible: "true" };
			})
		);
	};

	const hideCard = (event) => {
		setCardsData(
			cardsData.map((card) => {
				if (card.name === event.target.id) {
					card.visible = "false";
					setHiddenNames([...hiddenNames, card.name]);
					localStorage.setItem(card.name, false);
					return { ...card, visible: "false" };
				}
				return card;
			})
		);
	};

	const checkLocalStorage = (cardName) => {
		if (!localStorage.getItem(cardName)) {
			localStorage.setItem(cardName, true);
			return true;
		} else return localStorage.getItem(cardName);
	};

	const renderPageSelector = () => {		
		const pages = [];
		for (let i = 0; i < pagination.pages; i++) {
			pages.push(i + 1);
		}
		return pages.map((page) => (
			
			<button id={page} className={page === parseInt(pagination.currentPage) ? "btn btn-primary" : "btn btn-outline-info"} onClick={selectPage}>
				{page}
			</button>
		));
	};

	const selectPage = (event) => {
		pagination.selectPage(event.target.id);
	};

	const sortCardsData = (type) => {
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

	const switchSort = (event) => {
		sortCardsData(event.target.id);
	};

	return !isLoaded ? (
		<Spinner />
	) : (
		<>
			<div>
				<button
					className="btn btn-outline-secondary btn-sm"
					onClick={resetCardsVisible}
				>
					Показать скрытые
				</button>
				<input
					id="category"
					name="filter-radio"
					onClick={switchSort}
					type="radio"
				/>
				Категория
				<input
					id="timestamp"
					name="filter-radio"
					onClick={switchSort}
					type="radio"
				/>
				Дата
				<input id="name" name="filter-radio" onClick={switchSort} type="radio" />
				Название
				<input
					id="filesize"
					name="filter-radio"
					onClick={switchSort}
					type="radio"
				/>
				Размер
				<div className="text-center">{renderPageSelector()}</div>
			</div>
			<div>	
				<div className="d-flex flex-wrap" style={{"justifyContent" : "center"}}>
					<CardsViewPage itemsSet={itemsToView} hideCard={hideCard} />
				</div>
			</div>
		</>
	);
};

export default CardsView;
