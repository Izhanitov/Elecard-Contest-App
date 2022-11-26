const ImageModal = ({item}) => {
    const renderModal = () => {        
        const {url, name} = item;
        console.log(url);
        console.log(name);
        return (
            <div  style={{"zIndex":"100"}}>
                <img src={url} alt={name} />
             </div>              
        )
    }

    return <>{renderModal()}</>
}

export default ImageModal;