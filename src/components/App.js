import React, { useEffect } from "react";
import "../index.css";
import { newApi } from "../utils/Api";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [deleteCardId, setDeleteCardId] = React.useState("");

  useEffect(() => {
    newApi
      .getUserInfoApi()
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
    newApi
      .getInitialCards()
      .then((cardsFromServer) => {
        setCards(cardsFromServer);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isDeleteCardPopupOpen ||
    selectedCard;

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    newApi
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
    newApi
      .deleteCard(deleteCardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== deleteCardId));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => closeAllPopups());
  }

  function handleEditAvatarClick(evt) {
    if (evt.target.classList.contains("profile__img-wrapper")) {
      setIsEditAvatarPopupOpen(true);
    }
  }
  function handleCardDelete(card) {
    setDeleteCardId(card._id);
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
    newApi
      .setUserInfoApi(userData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => closeAllPopups());
  }
  function handleUpdateAvatar(srcAvatar) {
    newApi
      .setUserAvatarApi(srcAvatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => closeAllPopups());
  }
  function handleAddPlaceSubmit(dataCard) {
    newApi
      .addCard(dataCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => closeAllPopups());
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
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("mousedown", handleClickClosePopup); // добавляем
      return () => {
        document.removeEventListener("keydown", closeByEscape);
        document.removeEventListener("mousedown", handleClickClosePopup); // удаляем
      };
    }
  }, [isOpen]);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />

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
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
