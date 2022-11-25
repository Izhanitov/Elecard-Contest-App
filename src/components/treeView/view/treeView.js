import { useState, useMemo, useCallback } from "react";

import ImageModal from "../../imageModal/imageModal";
import CategoryNode from "../categoryNode/categoryNode";

const TreeView = ({data}) => {
    const [expandList, setExpandList] = useState([]);
    const [rootPosition, setRootPosition] = useState(true);
    const [modalProps, setModalProps] = useState();

    const getCategories = useCallback(() => {       
        return [...new Set(data.map(item => item.category))];
    }, [data])

    const categories = useMemo(() => getCategories(), [getCategories])

    const expandNode = useCallback((event) => {
        expandList.find(item => item === event.target.id) ? 
            setExpandList(expandList.filter(item => item !== event.target.id)) : setExpandList([...expandList, event.target.id])
    }, [expandList])

    const expandRoot = useCallback(() => setRootPosition(!rootPosition), [rootPosition])

    const renderChildNode = useCallback(() => {
        return categories.map(category => {
            const checkExpand = expandList.find(item => item === category);
            return (
                <CategoryNode categoryName={category} checkExpand={checkExpand} expandFunc={expandNode} thumbnailItems={data} callModal={callModal}/>                
        )})
    }, [data, categories, expandList, expandNode])

    const callModal = (event) => setModalProps({url: event.target.src, name: event.target.alt});

    const renderTree = useCallback(() => {        
        return(
            <div>
                <button id="root" onClick={expandRoot}>{rootPosition ? "-" : "+"}</button>
                <div></div>
                {rootPosition ? renderChildNode() : <></>}
            </div>

        )
     }, [renderChildNode, expandRoot, rootPosition])

    return (
        <>
            {renderTree()}
            {modalProps && <ImageModal item={modalProps}/>}
        </>
    )
}

export default TreeView;