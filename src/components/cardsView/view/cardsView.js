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
		try {
			setHiddenNames(JSON.parse(localStorage.hiddenNames)); 
		}
		catch(err) {
			localStorage.hiddenNames = "";
		}
		finally {
			setCardsData(data);
			setIsLoaded(true);
		}
	}, [data])	

	useEffect(() => {
		if(isLoaded) {
			sortCardsData("name");
		}
	}, [isLoaded])

	const resetCardsVisible = useCallback(() => {
		setHiddenNames([]);
		localStorage.hiddenNames = "";
	}, [])

	const hideCard = useCallback((event) => {
		const element = document.getElementById(`card-item-${event.target.id}`);
		const duration = 500;
		if (element) {
			element.animate({opacity: "0",}, { duration, fill: "forwards", }
		)

		setTimeout(() => {
			const hiddenArr = [...hiddenNames, event.target.id];
			setHiddenNames([...hiddenNames, event.target.id]);
			localStorage.hiddenNames = JSON.stringify(hiddenArr);
		}, duration)}}, [hiddenNames]);
	
	const selectPage = useCallback((event) => {
		pagination.selectPage(event.target.id);
	}, [pagination])
	
	const renderPageSelector = useCallback(() => {		
		const pages = [];
		for (let i = 0; i < pagination.pages; i++) {
			pages.push(i + 1);
		}
		return pages.map((page) => (
			
			<button key={page} id={page} className={page === parseInt(pagination.currentPage) ? "btn btn-primary" : "btn btn-outline-info"} onClick={selectPage}>
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
			<div className="mt-2 d-flex justify-content-around">
				<button
					className="btn btn-outline-secondary btn-sm ms-1"
					onClick={resetCardsVisible}
				>
					Показать скрытые
				</button>
				<div className="d-flex align-items-center">Сортировать
					<div className="mt-1 ms-1">
						<input
							className="btn-check"
							id="category"
							name="filter-radio"
							onClick={switchSort}
							type="radio"							
						/>
						<label className="btn btn-primary me-1" htmlFor="category">Категория</label>
						<input
							className="btn-check"
							id="timestamp"
							name="filter-radio"
							onClick={switchSort}
							type="radio"
						/>
						<label className="btn btn-primary me-1" htmlFor="timestamp">Дата</label>
						<input 
							className="btn-check"
							id="name" 
							name="filter-radio" 
							onClick={switchSort} 
							type="radio"
							defaultChecked
						/>
						<label className="btn btn-primary me-1" htmlFor="name">Название</label>
						<input
							className="btn-check"
							id="filesize"
							name="filter-radio"
							onClick={switchSort}
							type="radio"						
						/>
						<label className="btn btn-primary" htmlFor="filesize">Размер</label>
					</div>	
				</div>	
			</div>
			<div className="text-center d-block m-2">{renderPageSelector()}</div>
			<div>	
				<div className="d-flex flex-wrap" style={{"justifyContent" : "center"}}>
					<CardsViewPage itemsSet={itemsToView} hideCard={hideCard} />
				</div>
			</div>
		</>
	)
}

export default CardsView;
