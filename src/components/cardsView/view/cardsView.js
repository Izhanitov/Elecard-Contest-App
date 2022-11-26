import { useState, useEffect, useMemo, useCallback } from "react";

import Spinner from "../../spinner/spinner";
import usePagination from "../../usePagination/usePagination";
import CardsViewPage from "../cardsViewPage/cardsViewPage";

const CardsView = ({ data }) => {
	const [cardsData, setCardsData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hiddenNames, setHiddenNames] = useState([]);

	const pagination = usePagination(data.length - hiddenNames.length, 51);

	const itemsToView = useMemo(
		() => cardsData.filter(item => !hiddenNames.some(hidden => item.name === hidden)).slice(pagination.firstIndex, pagination.lastIndex + 1),
		[hiddenNames, pagination.firstIndex, pagination.lastIndex, cardsData]
	)

	useEffect(() => {
		localStorage.hiddenNames ? 
			setHiddenNames(JSON.parse(localStorage.hiddenNames)) : localStorage.hiddenNames = "";
		setCardsData(data);
		setIsLoaded(true);
	}, [data])	

	const resetCardsVisible = useCallback(() => {
		setHiddenNames([]);
		localStorage.hiddenNames = "";
	}, [])

	const hideCard = useCallback((event) => {
		const hiddenArr = [...hiddenNames, event.target.id];
		setHiddenNames([...hiddenNames, event.target.id]);
		localStorage.hiddenNames = JSON.stringify(hiddenArr);
	}, [hiddenNames]);
	
	const selectPage = useCallback((event) => {
		pagination.selectPage(event.target.id);
	}, [pagination])
	
	const renderPageSelector = useCallback(() => {		
		const pages = [];
		for (let i = 0; i < pagination.pages; i++) {
			pages.push(i + 1);
		}
		return pages.map((page) => (
			
			<button id={page} className={page === parseInt(pagination.currentPage) ? "btn btn-primary" : "btn btn-outline-info"} onClick={selectPage}>
				{page}
			</button>
		));
	}, [pagination, selectPage])

	const sortCardsData = useCallback((type) => {
		const orderedCards = [].concat(cardsData);

		switch (type) {
			case "category":
				orderedCards.sort((a, b) =>
					a.category > b.category ? 1 : b.category > a.category ? -1 : 0
				);
				break;
			case "timestamp":
				orderedCards.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
				break;
			case "name":
				orderedCards.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
				break;
			case "filesize":
				orderedCards.sort((a, b) => parseInt(a.filesize) - parseInt(b.filesize));
				break;
			default:
				break;
		}
		setCardsData(orderedCards);
	}, [cardsData])

	const switchSort = useCallback((event) => {
		sortCardsData(event.target.id);
	}, [sortCardsData])

	return !isLoaded ? <Spinner /> : (
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
	)
}

export default CardsView;
