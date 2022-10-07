import React from "react";

function ConfirmPopup({isOpen, onClose, onConfirmDelete}) {
    
    const handleDeleteClick = () => {
        onConfirmDelete();
    }

    return(
        <div className={`popup popup-confirm ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={onClose}></button>
                <h2 className="popup__title">Вы уверены?</h2>
                <button className="popup__confirm" type="button" onClick={handleDeleteClick}>
                    Да
                </button>
            </div>
        </div>
    )
}

export default ConfirmPopup;