import React, { useEffect } from "react";
import "../index.css";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  function handleEditAvatarClick(evt) {
    if (evt.target.classList.contains("profile__img-wrapper")) {
      setIsEditAvatarPopupOpen(true);
    }
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
    setSelectedCard(null);
  };

  return (
    <div className="App">
      <div className="page">
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm
          name={`edit-profile`}
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
          <input
            type="text"
            placeholder="Имя Фамилия"
            className="pop-up__input pop-up__input_user-name"
            name="name-input"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="name-input-error pop-up__input-error"></span>
          <input
            type="text"
            placeholder="О себе"
            className="pop-up__input pop-up__input_user-job"
            name="job-input"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="job-input-error pop-up__input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name={`add-card`}
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
          <input
            type="text"
            placeholder="Название"
            className="pop-up__input pop-up__input_card-name"
            name="name-card-input"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="name-card-input-error pop-up__input-error"></span>
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className=" pop-up__input pop-up__input_card-url"
            name="url-input"
            required
          />
          <span className="url-input-error pop-up__input-error"></span>
        </PopupWithForm>

        <PopupWithForm
          name={`delete-card`}
          title="Вы уверены?"
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name={`edit-avatar`}
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="pop-up__input pop-up__input_url-avatar"
            name="url-avatar-input"
            required
          />
          <span className="url-avatar-input-error pop-up__input-error"></span>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
