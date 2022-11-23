import { useState, useEffect } from "react";

import RestService from "../../services/RestService/RestService";
import CardsView from "../CardsView/CardsView";
import TreeView from "../TreeView/TreeView";
import Spinner from "../Spinner/Spinner";

const MainSection = () => {
    const restSerice = new RestService();

    const [isLoaded, setIsLoaded] = useState(false);
    const [view, setView] = useState("card");
    
    const [cardsData, setCardsData] = useState();

    useEffect(() => {
        restSerice.getCards()
        .then(setCardsData)
        .then(() => setIsLoaded(true))
        .catch();
    }, [])

    const SwitchRadio = (event) => {
        switch(event.target.id) {
            case "card":
                setView("card")
                break;
            case "tree":
                setView("tree")
                break;
            default:
                break;                
        }
    }

    return !isLoaded ? <Spinner /> : (
        <div>
            <input id="card" name="content-radio" onClick={SwitchRadio} type="radio" checked={view === 'card'}/>Карточки
            <input id="tree" name="content-radio" onClick={SwitchRadio} type="radio" checked={view === 'tree'}/>Дерево            
            {view === "card" && <CardsView data={cardsData} />}
            {view === "tree" && <TreeView data={cardsData} />}            
        </div>     
    )
}

export default MainSection;