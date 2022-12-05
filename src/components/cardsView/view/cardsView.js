import { useState, useEffect, useMemo, useCallback } from "react";

import Spinner from "../../spinner/spinner";
import usePagination from "../../usePagination/usePagination";
import CardsViewPage from "../cardsViewPage/cardsViewPage";

const CardsView = ({ data }) => {
	const [cardsData, setCardsData] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [hiddenNames, setHiddenNames] = useState([]);
	const [sortType, setSortType] = useState();
	const [isAllHidden, setIsAllHidden] = useState(false);

	const pagination = usePagination(cardsData.length - hiddenNames.length, 51);

	const itemsToView = useMemo(
		() => {
			const selected = cardsData.filter(item => !hiddenNames.some(hidden => item.url === hidden)).slice(pagination.firstIndex, pagination.lastIndex + 1);
			if(cardsData.length > 0 && cardsData.length === hiddenNames.length) {setIsAllHidden(true)} 
			return selected;
		}, [hiddenNames, pagination.firstIndex, pagination.lastIndex, cardsData])	

	useEffect(() => {
		try {
			setHiddenNames(JSON.parse(localStorage.hiddenNames)); 
		}
		catch(err) {
			localStorage.hiddenNames = "";
		}
		finally {
			setIsLoaded(true);
		}
	}, [data])	

	const resetCardsVisible = useCallback(() => {
		setHiddenNames([]);
		localStorage.hiddenNames = "";
		setIsAllHidden(false);
	}, [])

	const hideCard = useCallback((event) => {
		const element = document.getElementById(`card-item-${event.target.id}`);
		const duration = 350;
		if (element) {
			element.animate({opacity: "0",}, { duration, fill: "forwards", }
		)

		setTimeout(() => {
			const hiddenArr = [...hiddenNames, event.target.id];
			setHiddenNames([...hiddenNames, event.target.id]);
			localStorage.hiddenNames = JSON.stringify(hiddenArr);
			if(pagination.firstIndex === pagination.lastIndex) {
				pagination.currentPage === 0 ? setIsAllHidden(true) : pagination.selectPage(pagination.currentPage - 1)
			}
		}, duration)}}, [hiddenNames, pagination]);
	
	const selectPage = useCallback((event) => {
		pagination.selectPage(event.target.id);
	}, [pagination])
	
	const renderPageSelector = useCallback(() => {		
		if(!isAllHidden) {
			const pages = [];
			for (let i = 0; i < pagination.pages; i++) {
				pages.push(i + 1);
			}
			return pages.map((page) => (
				
				<button key={page} id={page} className={page === parseInt(pagination.currentPage) ? "btn btn-primary" : "btn btn-outline-info m-1"} onClick={selectPage}>
					{page}
				</button>
			));
		} else {
			return <div className="mt-5 fs-4">Вы скрыли все карточки! Пожалуйста, нажмите кнопку «Показать скрытые» в верхнем меню для сброса.</div>
		}
	}, [pagination.currentPage, pagination.pages, selectPage, isAllHidden])

	const sortCardsData = useCallback((type) => {
		const orderedCards = [].concat(data);		
		let isSorted = false;
		switch (type) {
			case "category":
				orderedCards.sort((a, b) =>	a.category > b.category ? 1 : b.category > a.category ? -1 : 0);
				isSorted = true;				
				break;
			case "timestamp":
				orderedCards.sort((a, b) => parseInt(a.timestamp) - parseInt(b.timestamp));
				isSorted = true;
				break;
			case "name":
				orderedCards.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
				isSorted = true;
				break;
			case "filesize":
				orderedCards.sort((a, b) => parseInt(a.filesize) - parseInt(b.filesize));
				isSorted = true;
				break;
			default:
				sortCardsData("name");
				break;
		}
		if(isSorted) {
			setCardsData(orderedCards);
			localStorage.sortType = type;
			setSortType(type);
		} 
	}, [data])

	useEffect(() => {
		if(isLoaded) {
			localStorage.sortType ? sortCardsData(localStorage.sortType) : sortCardsData("name");
		}
	}, [isLoaded, sortCardsData])

	const switchSort = useCallback((event) => {
		sortCardsData(event.target.id);
	}, [sortCardsData])

	return !isLoaded ? <Spinner /> : (
		<>
			<div className="mx-1">
				<div className="mt-2 row justify-content-around align-items-center">
					<div className="col-12 col-sm-2 col-md-2 col-lg-2 text-center">
						<button
							className="btn btn-outline-secondary"
							onClick={resetCardsVisible}
						>
							Показать скрытые
						</button>
					</div>

					<div className="col-12 col-sm-5 col-md-7 col-lg-5 col-xl-6 col-xxl-5">
						<div className="row d-flex align-items-center">
							<div className="col-12 col-xl-4 text-center">Сортировать</div>					
							<div className="col-sm-6 col-md-3 col-xl-2 text-center">
								<input
									className="btn-check"
									id="category"
									name="filter-radio"
									onClick={switchSort}
									type="radio"
									checked = {sortType === "category" ? true : false}
									readOnly							
								/>
								<label className="btn nav-button btn-primary" htmlFor="category">Категория</label>
							</div>
							<div className="col-12 col-sm-6 col-md-3 col-xl-2 text-center">	
								<input
									className="btn-check"
									id="timestamp"
									name="filter-radio"
									onClick={switchSort}
									type="radio"
									checked = {sortType === "timestamp" ? true : false}
									readOnly
								/>
								<label className="btn nav-button btn-primary" htmlFor="timestamp">Дата</label>
							</div>
							<div className="col-12 col-sm-6 col-md-3 col-xl-2 text-center">
								<input 
									className="btn-check"
									id="name" 
									name="filter-radio" 
									onClick={switchSort} 
									type="radio"
									checked = {sortType === "name" ? true : false}
									readOnly
								/>
								<label className="btn nav-button btn-primary" htmlFor="name">Название</label>
							</div>
							<div className="col-12 col-sm-6 col-md-3 col-xl-2 text-center">
								<input
									className="btn-check"
									id="filesize"
									name="filter-radio"
									onClick={switchSort}
									type="radio"
									checked = {sortType === "filesize" ? true : false}
									readOnly						
								/>
								<label className="btn nav-button btn-primary" htmlFor="filesize">Размер</label>
							</div>
						</div>	
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
