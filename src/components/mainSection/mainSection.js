import { useState, useEffect, useCallback, useMemo } from "react";

import RestService from "../../services/restService/restService";
import CardsView from "../cardsView/view/cardsView";
import TreeView from "../treeView/view/treeView";
import Spinner from "../spinner/spinner";
import ErrorComponent from "../errorComponent/errorComponent";

const MainSection = () => {
    const restService = useMemo(() => new RestService(), [])

    const [isLoaded, setIsLoaded] = useState(false);
    const [view, setView] = useState("card");
    const [isError, setIsError] = useState(false);
    const [imagesData, setImagesData] = useState();

    const createDataSet = useCallback((data) => {
        const dataSet = data.map((card) => {
            if (
                card &&
                card.image &&
                card.filesize &&
                card.timestamp &&
                card.category
            ) {
                const { image, filesize, timestamp, category } = card;
                setIsError(false);
                return {
                    name: image.split('/').pop(),
                    filesize,
                    timestamp,
                    category
                }
            } else {
                throw new Error("Response does not contain valid data");
            }
        });
        
        setImagesData(dataSet);
    }, [])

    useEffect(() => {
        restService.getCards()
        .then(createDataSet)
        .then(() => setIsLoaded(true))
        .catch(setIsError(true));
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

    return isError ? <ErrorComponent /> : (!isLoaded ? <Spinner /> : (
        <>
            <div className="text-center">
                <input id="card" className="btn-check" name="content-radio" onClick={SwitchView} type="radio" defaultChecked/>
                <label className="btn btn-light" htmlFor="card">Карточки</label>
                <input id="tree" className="btn-check" name="content-radio" onClick={SwitchView} type="radio" />
                <label className="btn btn-light" htmlFor="tree">Дерево</label>            
            </div>
            <div>
                {view === "card" && <CardsView data={imagesData} />}
                {view === "tree" && <TreeView data={imagesData} />}
            </div> 
        </>   
    ))
}

export default MainSection;