import { useEffect, useState, useMemo } from "react";
import Spinner from "../spinner/spinner";

const TreeView = ({data}) => {
    const [imagesData, setImagesData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setImagesData(data);
        setIsLoaded(true);
    }, [data])

    const getCategories = () => {       
        return [...new Set(imagesData.map(item => item.category))];
    }

    const categories = useMemo(() => getCategories(), [isLoaded])

    const renderTree = () => {
        return categories.map(category => {
            return (                
            <div>
                {console.log(imagesData)}
                <div><h4>{category}</h4></div>
                   <div>{imagesData.filter(item => item.category === category).map(item => {return (<div>{item.image}</div>)})}</div>
            </div>
        )})
    }

    return isLoaded ? <>{renderTree()}</> : <Spinner />
}

export default TreeView;