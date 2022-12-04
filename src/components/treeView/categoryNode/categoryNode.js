import { useCallback } from "react"

import ThumbnailNode from "../thumbnailNode/thumbnailNode"

const CategoryNode = ({categoryName, thumbnailItems, expandFunc, checkExpand, callModal}) => {

    const renderCategoryNode = useCallback(() => {
        return (
            <div className="d-block ms-2">                
                <div className="d-flex">
                    <button className={"tree-button"} id={categoryName} onClick={expandFunc}>{checkExpand ? "-" : "+"}</button>
                    <div>{categoryName}</div>
                </div>
                {checkExpand ? 
                    <div className="row ms-2" >
                        {thumbnailItems.filter(item => item.category === categoryName).map(item => {
                            return (<div className="col" key={item.name}><ThumbnailNode item={item} callModal={callModal}/></div>)
                            })}
                    </div> : <></>
                }
            </div>
        )
    }, [categoryName, checkExpand, expandFunc, thumbnailItems, callModal])

    return <>{renderCategoryNode()}</>
}

export default CategoryNode;