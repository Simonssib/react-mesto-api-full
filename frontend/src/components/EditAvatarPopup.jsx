import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarUrl = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarUrl.current.value,
    });
  }

  useEffect(() => {
    avatarUrl.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label className="popup__input-container">
        <input
          id="avatar-input"
          type="url"
          name="link"
          required
          className="popup__field popup__field_avatar_link"
          placeholder="Ссылка на аватар"
          ref={avatarUrl}
        />
        <span className="popup__input-error avatar-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;