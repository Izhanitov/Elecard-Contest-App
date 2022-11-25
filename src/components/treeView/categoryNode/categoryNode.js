import { useCallback } from "react"

import ThumbnailNode from "../thumbnailNode/thumbnailNode"

const CategoryNode = ({categoryName, thumbnailItems, expandFunc, checkExpand, callModal}) => {

    const renderCategoryNode = useCallback(() => {
        return (
            <div className="d-block">                
                <div className="d-flex">
                    <button id={categoryName} onClick={expandFunc}>{checkExpand ? "-" : "+"}</button>
                    <h4>{categoryName}</h4>
                </div>
                {checkExpand ? 
                    <div className="d-block">
                        {thumbnailItems.filter(item => item.category === categoryName).map(item => {
                            return (<ThumbnailNode item={item} callModal={callModal}/>)
                            })}
                    </div> : <></>
                }
            </div>
        )
    }, [categoryName, checkExpand, expandFunc, thumbnailItems, callModal])

    return <>{renderCategoryNode()}</>
}

export default CategoryNode;