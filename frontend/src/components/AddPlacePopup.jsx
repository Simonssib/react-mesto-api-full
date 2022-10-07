import React, { useRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const placeUrl = useRef("");
  const placeName = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: placeName.current.value,
      link: placeUrl.current.value,
    });
  }

  useEffect(() => {
    placeName.current.value = "";
    placeUrl.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="post"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <label className="popup__input-container">
        <input
          id="title-input"
          type="text"
          name="name"
          required
          className="popup__field popup__field_text_title"
          placeholder="Название места"
          minLength="2"
          maxLength="30"
          ref={placeName}
        />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__input-container">
        <input
          id="link-input"
          type="url"
          name="link"
          required
          className="popup__field popup__field_text_link"
          placeholder="Ссылка на картинку"
          ref={placeUrl}
        />
        <span className="popup__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
