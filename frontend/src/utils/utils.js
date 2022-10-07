export const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const validationList = {
    formSelector: '.popup__form',
    inputElement: '.popup__field',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__field_type_error',
    errorClass: 'popup__field_type_error'
};

export const popupZoom = document.querySelector(".popup-zoom");
export const popupZoomPhoto = document.querySelector(".popup__zoom-photo");
export const popupZoomCaption = document.querySelector(".popup__zoom-caption");
const profilePopup = document.querySelector('.popup-profile');
export const profilePopupOpen = document.querySelector('.profile__button-edit');
const postPopup = document.querySelector('.popup-post');
const avatarPopup = document.querySelector('.popup-avatar');
export const postPopupOpen = document.querySelector('.profile__button-add');
export const popupInputName = document.querySelector('.popup__field_text_name');
export const popupInputProfession = document.querySelector('.popup__field_text_profession');
export const formProfile = profilePopup.querySelector('.popup__form');
export const inputCardTitle = postPopup.querySelector('.popup__field_text_title');
export const inputCardLink = postPopup.querySelector('.popup__field_text_link');
export const formCard = postPopup.querySelector('.popup__form');
export const profileAvatarInput = avatarPopup.querySelector('.popup__field_avatar_link');
export const avatarPopupOpen = document.querySelector('.profile__edit-avatar');
export const formAvatar = avatarPopup.querySelector('.popup__form');