import React from 'react';

function PopupWithForm ({title, name, isOpen, onClose, children, buttonText, onSubmit}) {
    
    return(
      <section className={`popup popup-${name} ${isOpen && 'popup_opened'}`}>
        <div className="popup__container">
          <button className="popup__close" type="button" onClick={onClose}></button>
          <h2 className="popup__title">{title}</h2>
          <form className="popup__form" name={name} onSubmit={onSubmit} >          
            <fieldset className="popup__form-set">
                {children}
                <button className="popup__save" type="submit">{buttonText}</button>
            </fieldset>
          </form>
        </div>
      </section >
    )
}

export default PopupWithForm;