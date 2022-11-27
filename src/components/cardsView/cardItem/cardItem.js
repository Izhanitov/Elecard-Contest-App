const CardItem = ({item, hideCard}) => {

    const convertTimeStamp = (timestamp) => {
        const date = new Date(parseInt(timestamp));
        return `${date.toLocaleString()}`
    }

    const renderItem = () => {
        return(
            
            <div id={`card-item-${item.name}`} className="content-card">                
                <div className="content-card-nav">
                    <button id={item.name} onClick={hideCard} className="btn-close b bg-light"></button>   
                </div>
                                 
                <div className="content-card-topside">
                    <img className="d-flex content-card-image"
                            src={`http://contest.elecard.ru/frontend_data/${item.category}/${item.name}`}
                            alt={item.name}
                        />
                </div> 
                <div className="content-card-attributes">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                Наименование:
                            </div>
                            <div className="col-9">
                                {item.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                Категория:
                            </div>                        
                            <div className="col-9">
                                {item.category}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                Размер:
                            </div>                            
                            <div className="col-9">
                                {item.filesize}
                            </div>
                        <div className="row">
                            <div className="col-3">
                                Дата:
                            </div>
                            <div className="col-9">
                                {convertTimeStamp(item.timestamp)}
                            </div>
                        </div>
                        </div>
                    </div>  
                </div>               
            </div>

        )
    }

    return <>{renderItem()}</>
}

export default CardItem;