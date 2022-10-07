import { useContext } from "react";
import React from "react";
import "../index.css";
import Card from "./Card.jsx";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img alt="Аватар" className="profile__avatar" src={currentUser.avatar} />
          <button
            onClick={onEditAvatar}
            type="button"
            className="profile__edit-avatar"
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__info-edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__button-edit"
              type="button"
            ></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__button-add"
          type="button"
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card 
            key={card._id} 
            card={card} 
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;
