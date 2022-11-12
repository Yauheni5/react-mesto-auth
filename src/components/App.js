import React, { useEffect, useState } from "react";
import "../index.css";
import { api } from "../utils/Api";
import { authorizationApi } from "../utils/AuthApi";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [infoToolTipStatus, setInfoToolTipStatus] = useState({
    status: false,
    text: "",
  });
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToBeDeletedId, setCardToBeDeletedId] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    if (loggedIn) {
      api
        .getAllPromise()
        .then(([userInfo, cardsFromServer]) => {
          setCurrentUser(userInfo);
          setCards(cardsFromServer);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggedIn]);

  function registrationUser(data) {
    authorizationApi
      .registrationUserApi({
        email: data.email,
        password: data.password,
      })
      .then(() => {
        setIsRegisteredUser(true);
        setIsInfoToolTipOpen(true);
        setInfoToolTipStatus({
          status: true,
          text: "Вы успешно зарегистрировались!",
        });
      })
      .catch((err) => {
        err.json().then((error) => {
          setTooltipErrorInfo(error);
          console.log(error.message || error.error || err.status); // выведем ошибку в консоль
        });
      });
  }

  function authorizationUser(data) {
    authorizationApi
      .authorizationUserApi({
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("token", res.token);
      })
      .catch((err) => {
        err.json().then((error) => {
          setTooltipErrorInfo(error);
          console.log(error.message || error.error || err.status); // выведем ошибку в консоль
        });
      });
  }

  function setTooltipErrorInfo(errorResponse) {
    setIsInfoToolTipOpen(true);
    setInfoToolTipStatus({
      status: false,
      text:
        errorResponse.message ||
        errorResponse.error ||
        `Ошибка: ${errorResponse}`,
    });
  }

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      authorizationApi
        .checkUserToken(token)
        .then((res) => {
          setIsRegisteredUser(true);
          setLoggedIn(true);
          setLoginUser(res.data.email);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }, [loggedIn]);

  const isAnyPopupOpened =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isDeleteCardPopupOpen ||
    selectedCard ||
    isInfoToolTipOpen;

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .handleToggleLikeApi(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function onConfirmDelete() {
    api
      .deleteCard(cardToBeDeletedId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== cardToBeDeletedId));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleClickRegisteredState() {
    if (isRegisteredUser) {
      setIsRegisteredUser(false);
    } else {
      setIsRegisteredUser(true);
    }
  }

  function handleClickLogout() {
    setIsRegisteredUser(false);
    setLoggedIn(false);
    setLoginUser("");
    localStorage.removeItem("token");
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardDelete(card) {
    setCardToBeDeletedId(card._id);
    setIsDeleteCardPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfoApi(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  function handleUpdateAvatar(srcAvatar) {
    api
      .setUserAvatarApi(srcAvatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
  function handleAddPlaceSubmit(dataCard) {
    api
      .addCard(dataCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    const handleClickClosePopup = (event) => {
      if (
        event.target.classList.contains("pop-up_active") ||
        event.target.classList.contains("pop-up__close-icon")
      ) {
        closeAllPopups();
      }
    };
    if (isAnyPopupOpened) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("mousedown", handleClickClosePopup); // добавляем
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("mousedown", handleClickClosePopup); // удаляем
      };
    }
  }, [isAnyPopupOpened]);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setIsInfoToolTipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
            isRegisteredUser={isRegisteredUser}
            onRegisteredUser={handleClickRegisteredState}
            loginUser={loginUser}
            handleClickLogout={handleClickLogout}
          />
          <Switch>
            <Route path="/sign-up">
              {loggedIn && isRegisteredUser ? (
                <Redirect to="/" />
              ) : isRegisteredUser ? (
                <Redirect to="/sign-in" />
              ) : (
                <Redirect to="/sign-up" />
              )}
              <Register
                onRegisteredUser={handleClickRegisteredState}
                onRegistrationUser={registrationUser}
              />
            </Route>

            <Route path="/sign-in">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              {isRegisteredUser ? (
                <Redirect to="/sign-in" />
              ) : (
                <Redirect to="/sign-up" />
              )}
              <Login
                onRegisterUser={authorizationUser}
                onRegisteredUser={handleClickRegisteredState}
              />
            </Route>

            <ProtectedRoute
              exact
              path="/"
              isLogged={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              component={Main}
            />

            <Route exact path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onConfirmDelete={onConfirmDelete}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            isOpen={isInfoToolTipOpen}
            infoToolTipStatus={infoToolTipStatus}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
