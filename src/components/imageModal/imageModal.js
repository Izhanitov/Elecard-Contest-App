const ImageModal = ({item, onClose}) => {
    const renderModal = () => {        
        const {url, name} = item;
        return (<>
            <div className="modal fade show d-block" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" onClick={onClose}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content" > 
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">{name}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={onClose} aria-label="Close"></button>
                </div>
                <div className="modal-body text-center">
                  <img src={url} className="modal-img" alt={name}/>
                </div>
              </div>
            </div>
          </div>
          <div onClick={onClose} className="modal-backdrop fade show"></div>
          </>
        );
    }

    return <>{renderModal()}</>
}

export default ImageModal;