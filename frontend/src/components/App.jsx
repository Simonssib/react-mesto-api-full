import { useEffect, useState } from "react";
import {
  Switch, Route, Redirect, useHistory
} from "react-router-dom";
import React from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import ConfirmPopup from "./ConfirmPopup.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import imageSuccess from "../images/success.jpg";
import imageFail from "../images/fail.jpg";
import * as auth from "../utils/auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  //попап подтверждения нереализовал, в чек листе он отсутвует, поэтому решил пока оставить
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState(imageSuccess);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
  const [userInfo, setUserInfo] = useState('');
  const history = useHistory();
  

  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
      auth
        .checkToken(token)
        .then((res) => {
          setUserInfo(res.data.email);
          setLoggedIn(true);
          history.push("/");
          })
        .catch((err) => console.log(err));
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err)
        });

      api.getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  //попап подтверждения нереализовал, в чек листе он отсутвует, поэтому решил пока оставить
  const handleConfirmDeleteClick = () => {
    setIsConfirmPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (newInfo) => {
    api
      .editUserInfo(newInfo.name, newInfo.about)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (newInfo) => {
    api
      .editUserAvatar(newInfo.avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentUser) => currentUser._id !== card._id)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  const onLogin = (email, password) => {
    return auth
      .authorization(email, password)
      .then((res) => {
        setLoggedIn(true);
        setUserInfo(email);
        localStorage.setItem("jwt", res.token);
        history.push("/");
    })
      .catch((err) => {
        setInfoTooltipImage(imageFail);
        setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  };

  const onRegister = (email, password) => {
    auth
      .registration(email, password)
      .then(() => {
        setInfoTooltipImage(imageSuccess);
        setInfoTooltipMessage("Вы успешно зарегистрировались!");
        history.push("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipImage(imageFail);
        setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(()=> {
        setIsInfoTooltipOpen(true);
      })
  };

  const onLogOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header
            userEmail={userInfo}
            onLogOut={onLogOut}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />

            <Route exact path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>

            <Route exact path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </div>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          image={infoTooltipImage}
          message={infoTooltipMessage}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirmDelete={handleCardDelete}
        />
      </div>
    </CurrentUserContext.Provider>
  );
  };
export default App;
