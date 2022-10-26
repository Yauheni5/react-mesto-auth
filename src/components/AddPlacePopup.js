import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [nameCard, setNameCard] = React.useState("");
  const [srcImg, setSrcImg] = React.useState("");
  const [isValidInputNameCard, setIsValidInputNameCard] = React.useState(false);
  const [isValidInputSrcImg, setIsValidInputSrcImg] = React.useState(false);
  const [nameError, setNameError] = React.useState("");
  const [srcImgError, setSrcImgError] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);

  const handleChangeInputError = (e, setInputError, setInputValid) => {
    if (e.target.validity.valid) {
      setInputError("");
      setInputValid(true);
    } else {
      setInputError(e.target.validationMessage);
      setInputValid(false);
    }
  };

  function handleChangeName(e) {
    handleChangeInputError(e, setNameError, setIsValidInputNameCard);
    setNameCard(e.target.value);
  }

  function handleChangeSrc(e) {
    handleChangeInputError(e, setSrcImgError, setIsValidInputSrcImg);
    setSrcImg(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameCard,
      link: srcImg,
    });
  }

  function resetInputValues() {
    setNameCard("");
    setSrcImg("");
    setIsValidInputNameCard(false);
    setIsValidInputSrcImg(false);
    setIsValid(false);
  }

  React.useEffect(() => {
    resetInputValues();
  }, [isOpen, onClose]);

  React.useEffect(() => {
    setIsValid(isValidInputNameCard && isValidInputSrcImg);
  }, [isValidInputNameCard, isValidInputSrcImg]);

  return (
    <PopupWithForm
      name={`add-card`}
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input
        type="text"
        placeholder="Название"
        className="pop-up__input pop-up__input_card-name"
        name="name-card-input"
        value={"" || nameCard}
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeName}
      />
      <span
        className={
          isValidInputNameCard
            ? "name-card-input-error pop-up__input-error"
            : "name-card-input-error pop-up__input-error pop-up__error_visible"
        }>
        {nameError || " "}
      </span>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className=" pop-up__input pop-up__input_card-url"
        name="url-input"
        value={"" || srcImg}
        required
        onChange={handleChangeSrc}
      />
      <span
        className={
          isValidInputSrcImg
            ? "url-input-error pop-up__input-error"
            : "url-input-error pop-up__input-error pop-up__error_visible"
        }>
        {srcImgError || " "}
      </span>
    </PopupWithForm>
  );
}
