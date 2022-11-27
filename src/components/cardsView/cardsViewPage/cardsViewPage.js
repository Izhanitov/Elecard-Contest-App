import CardItem from "../cardItem/cardItem";

const CardsViewPage = ({itemsSet, hideCard}) => {
	const renderCards = () => {
		return itemsSet
			.map((item, i) => (
                <CardItem key={i + item.name} item={item} hideCard={hideCard} />               
			));
	}

    return <>{renderCards()}</>
}

export default CardsViewPage;