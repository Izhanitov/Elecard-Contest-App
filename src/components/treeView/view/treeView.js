import { useState, useMemo, useCallback, useEffect } from "react";

import ImageModal from "../../imageModal/imageModal";
import CategoryNode from "../categoryNode/categoryNode";
import Spinner from "../../spinner/spinner";

const TreeView = ({data}) => {
    const [expandList, setExpandList] = useState([]);
    const [rootPosition, setRootPosition] = useState(true);
    const [modalProps, setModalProps] = useState();
    const [treeData, setTreeData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTreeData(data);
        setIsLoaded(true);
    }, [data])

    const getCategories = useCallback(() => {       
        return [...new Set(treeData.map(item => item.category))];
    }, [treeData])

    const categories = useMemo(() => getCategories(), [getCategories])

    const expandNode = useCallback((event) => {
        expandList.find(item => item === event.target.id) ? 
            setExpandList(expandList.filter(item => item !== event.target.id)) : setExpandList([...expandList, event.target.id])
    }, [expandList])

    const expandRoot = useCallback(() => setRootPosition(!rootPosition), [rootPosition])

    const callModal = useCallback((event) => setModalProps({url: event.target.src, name: event.target.alt}), [])

    const renderChildNode = useCallback(() => {
        return categories.map(category => {
            const checkExpand = expandList.find(item => item === category);
            return (
                <CategoryNode key={category} categoryName={category} checkExpand={checkExpand} expandFunc={expandNode} thumbnailItems={treeData} callModal={callModal}/>                
        )})
    }, [treeData, categories, expandList, expandNode, callModal])

    const onClose = useCallback((event) => {
        if(event.target.className === "btn-close") {
            setModalProps(undefined);
        }
        if(event.target.id === "exampleModal" && event.target.className !== "modal-body text-center" && event.target.className !== "modal-header") {
            setModalProps(undefined);           
        }
    }, [])


    const renderTree = useCallback(() => {        
        return(
            <div className="ms-2 me-2">
                <div className="d-flex">
                    <button id="root" className="tree-button" onClick={expandRoot}>{rootPosition ? "-" : "+"}</button>
                    <div>Root</div>
                </div>
                {rootPosition ? renderChildNode() : <></>}
            </div>
        )
     }, [renderChildNode, expandRoot, rootPosition]) 

    return !isLoaded ? <Spinner /> : (
        <>
            {renderTree()}
            {modalProps && <ImageModal item={modalProps} onClose={onClose} />}
        </>
    )
}

export default TreeView;