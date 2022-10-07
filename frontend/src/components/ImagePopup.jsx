import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-zoom ${card ? "popup_opened" : ""}`}>
      <div className="popup__zoom">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup__photo">
          <img
            className="popup__zoom-photo"
            src={card ? card.link : ""}
            alt={card ? card.name : ""}
          />
          <figcaption className="popup__zoom-caption">
            {card ? card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
