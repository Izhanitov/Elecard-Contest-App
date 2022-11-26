import { useState, useEffect, useCallback, useMemo } from "react";

import RestService from "../../services/restService/restService";
import CardsView from "../cardsView/view/cardsView";
import TreeView from "../treeView/view/treeView";
import Spinner from "../spinner/spinner";

const MainSection = () => {
    const restService = useMemo(() => new RestService(), [])

    const [isLoaded, setIsLoaded] = useState(false);
    const [view, setView] = useState("card");
    
    const [imagesData, setImagesData] = useState();

    const createDataSet = useCallback((data) => {
        const dataSet = data.map((card) => {
            const { image, filesize, timestamp, category } = card;

            return {
                name: image.split('/').pop(),
                filesize,
                timestamp,
                category
            }
        });
        
        setImagesData(dataSet);
    }, [])

    useEffect(() => {
        restService.getCards()
        .then(createDataSet)
        .then(() => setIsLoaded(true))
        .catch((message) => console.log(message));
    }, [createDataSet, restService])    

    const SwitchView = useCallback((event) => {
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
    }, [])

    return !isLoaded ? <Spinner /> : (
        <>
            <div>
                <input id="card" className="btn-check" name="content-radio" onClick={SwitchView} type="radio" checked={view === 'card'}/>
                <label className="btn btn-light" htmlFor="card">Карточки</label>
                <input id="tree" className="btn-check" name="content-radio" onClick={SwitchView} type="radio" checked={view === 'tree'}/>
                <label className="btn btn-light" htmlFor="tree">Дерево</label>            
            </div>
            <div>
                {view === "card" && <CardsView data={imagesData} />}
                {view === "tree" && <TreeView data={imagesData} />}
            </div> 
        </>    
    )
}

export default MainSection;