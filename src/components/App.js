
import React from 'react';
import '../index.css';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import PopupWithForm from './PopupWithForm';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditAvatarClick (){
    setIsEditAvatarPopupOpen(true);
    document.addEventListener('keyup', closeAllPopups);
  }
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true);
    document.addEventListener('keyup', closeAllPopups);
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
    document.addEventListener('keyup', closeAllPopups);
  }
  function handleCardClick (cardData){
    setSelectedCard(cardData);
    document.addEventListener('keyup', closeAllPopups);
  }

  const handleClickClosePopup = (event) => {
    if (event.target.classList.contains('pop-up_active') || event.target.classList.contains('pop-up__close-icon')) {
      closeAllPopups();
    };
  }


  const closeAllPopups = () =>{
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    document.removeEventListener('keyup', closeAllPopups);
  }

  return (
  <div className = "App" >
    <div className="page">
      <Header />
      <Main
      onEditAvatar = {handleEditAvatarClick}
      onEditProfile = {handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onCardClick ={handleCardClick} />
      <Footer />
      <PopupWithForm
      name={`edit-profile`}
      title ="Редактировать профиль"
      children = {<>
        <input type="text" placeholder="Имя Фамилия" className="pop-up__input pop-up__input_user-name" name="name-input" required minLength="2" maxLength="40" />
        <span className="name-input-error pop-up__input-error"></span>
        <input type="text" placeholder="О себе" className="pop-up__input pop-up__input_user-job" name="job-input" required minLength="2" maxLength="200" />
        <span className="job-input-error pop-up__input-error"></span>
      </>}
      isOpen = {isEditProfilePopupOpen}
      onClose = {closeAllPopups}
      onCloseClick = {handleClickClosePopup}
      />
      <PopupWithForm
        name={`add-card`}
        title ="Новое место"
        children = {<>
          <input type="text" placeholder="Название" className="pop-up__input pop-up__input_card-name" name="name-card-input" minLength="2" maxLength="30" required />
          <span className="name-card-input-error pop-up__input-error"></span>
          <input type="url" placeholder="Ссылка на картинку" className=" pop-up__input pop-up__input_card-url" name="url-input" required />
          <span className="url-input-error pop-up__input-error"></span>
        </>}
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onCloseClick = {handleClickClosePopup}
      />
       <PopupWithForm
        name={`delete-card`}
        title ="Вы уверены?"
        children = {<>
            <button type="submit" className="pop-up__button pop-up__button-save pop-up__button-confirm">Да</button>
        </>}
        onClose = {closeAllPopups}
        onCloseClick = {handleClickClosePopup}
      />
      <PopupWithForm
        name={`edit-avatar`}
        title ="Обновить аватар"
        children = {<>
           <input type="url" placeholder="Ссылка на картинку" className="pop-up__input pop-up__input_url-avatar"
            name="url-avatar-input" required />
          <span className="url-avatar-input-error pop-up__input-error"></span>
        </>}
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
      />
      <ImagePopup
      card = {selectedCard}
      onClose = {closeAllPopups}
      onCloseClick = {handleClickClosePopup}
      />
    </div>
  </div>
  );
}

export default App;
