const ImageModal = ({item, onClose}) => {
    const renderModal = () => {        
        const {url, name} = item;
        console.log(url);
        console.log(name);
        return (<>
            <div class="modal fade show d-block" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content" > 
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">{name}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={onClose} aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                  <img src={url} className="modal-img" alt={name}/>
                </div>
              </div>
            </div>
          </div>
          <div onClick={onClose} class="modal-backdrop fade show"></div>
          </>
        );
    }

    return <>{renderModal()}</>
}

export default ImageModal;