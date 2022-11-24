import { useState, useEffect, useMemo } from "react";

const usePagination = (itemsLength, itemsOnPage) => {    
    const [currentPage, setCurrentPage] = useState(1);
    const [firstIndex, setFirstIndex] = useState();
    const [lastIndex, setLastIndex] = useState();

    const selectPage = (event) => {
        setCurrentPage(event);
    }

    const pages = useMemo(() => Math.floor((itemsLength + itemsOnPage - 1) / itemsOnPage), [itemsLength, itemsOnPage])

    useEffect(() => {    
        const firstItemOnPage = (currentPage - 1) * itemsOnPage;
        setFirstIndex(firstItemOnPage);
        setLastIndex(firstItemOnPage + itemsOnPage - 1);
        
    }, [currentPage, pages, itemsLength, itemsOnPage])

    return { pages, currentPage, firstIndex, lastIndex, selectPage }
}

export default usePagination;