const CardItem = ({item, hideCard}) => {

    const convertTimeStamp = (timestamp) => {
        const date = new Date(parseInt(timestamp));
        return `${date.toLocaleString()}`
    }

    const renderItem = () => {
        return(
            
            <div id={`card-item-${item.url}`} className="content-card">                
                <div className="content-card-nav">
                    <button id={item.url} onClick={hideCard} className="btn-close bg-light content-card-close-btn"></button>   
                </div>                                 
                <div className="content-card-topside">
                    <img className="d-flex content-card-image"
                            src={`http://contest.elecard.ru/frontend_data/${item.url}`}
                            alt={item.name}
                        />
                </div> 
                <div className="content-card-attributes">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-3 col-xs-12">
                                Наименование:
                            </div>
                            <div className="col-sm-9 col-xs-12">
                                {item.name}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3 col-xs-12">
                                Категория:
                            </div>                        
                            <div className="col-sm-9 col-xs-12">
                                {item.category}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3 col-xs-12">
                                Размер:
                            </div>                            
                            <div className="col-sm-9 col-xs-12">
                                {`${item.filesize} байт`}
                            </div>
                        <div className="row">
                            <div className="col-sm-3 col-xs-12">
                                Дата:
                            </div>
                            <div className="col-sm-9 col-xs-12">
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