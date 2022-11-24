import CardItem from "../cardItem/cardItem";

const CardsViewPage = ({itemsSet, hideCard}) => {
	const renderCards = () => {
		return itemsSet
			.filter((item) => item.visible === "true")
			.map((item) => (
                <CardItem item={item} hideCard={hideCard} />               
			));
	};

    return <>{renderCards()}</>
}

export default CardsViewPage;