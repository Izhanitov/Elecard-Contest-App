import { useState, useEffect } from "react";

import RestService from "../../services/restService/restService";
import CardsView from "../cardsView/cardsView";
import TreeView from "../treeView/treeView";
import Spinner from "../spinner/spinner";

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

    const SwitchView = (event) => {
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
        <>
            <div>
                <input id="card" className="btn-check" name="content-radio" onClick={SwitchView} type="radio" checked={view === 'card'}/>
                <label className="btn btn-light" htmlFor="card">Карточки</label>
                <input id="tree" className="btn-check" name="content-radio" onClick={SwitchView} type="radio" checked={view === 'tree'}/>
                <label className="btn btn-light" htmlFor="tree">Дерево</label>            
            </div>
            <div>
                {view === "card" && <CardsView data={cardsData} />}
                {view === "tree" && <TreeView data={cardsData} />}  

            </div> 
        </>    
    )
}

export default MainSection;