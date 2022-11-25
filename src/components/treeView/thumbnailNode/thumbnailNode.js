import { useCallback } from "react";

const ThumbnailNode = ({item, callModal}) => {
    const renderThumbnailNode = useCallback(() => {
        return (
            <div className="tree-thumbnail" onClick={callModal} category={item.category} name={item.name}>
                <img src={`http://contest.elecard.ru/frontend_data/${item.category}/${item.name}`} alt={item.name} className={"tree-thumbnail-image"}></img>
            </div>
        )
    }, [item, callModal])

    return <>{renderThumbnailNode()}</>
}

export default ThumbnailNode;