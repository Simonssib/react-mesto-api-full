import React from 'react';

function InfoTooltip ({isOpen, image, message, onClose}) {
    
    return(
      <section className={`popup ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={onClose}></button>
          <img className="popup__img" src={image} alt={message}/>
          <h2 className="popup__message">{message}</h2>
        </div>
      </section >
    )
}

export default InfoTooltip;