import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isInputNameValid, setIsInputNameValid] = React.useState(true);
  const [isInputDescriptionValid, setIsInputDescriptionValid] =
    React.useState(true);
  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
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
    handleChangeInputError(e, setNameError, setIsInputNameValid);
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    handleChangeInputError(e, setDescriptionError, setIsInputDescriptionValid);
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function resetInputValues() {
    setNameError("");
    setDescriptionError("");
    setIsInputNameValid(true);
    setIsInputDescriptionValid(true);
    setIsValid(true);
  }

  React.useEffect(() => {
    setIsValid(isInputNameValid && isInputDescriptionValid);
  }, [isInputNameValid, isInputDescriptionValid, isOpen, onClose]);

  React.useEffect(() => {
    resetInputValues();
    setName(currentUser.name);
    setDescription(currentUser.about); // eslint-disable-next-line
  }, [isOpen, onClose]);

  return (
    <PopupWithForm
      name={`edit-profile`}
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input
        type="text"
        placeholder="Имя Фамилия"
        value={name || ""}
        className="pop-up__input pop-up__input_user-name"
        name="name-input"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
      />
      <span
        className={
          isInputNameValid
            ? "name-input-error pop-up__input-error"
            : "name-input-error pop-up__input-error pop-up__error_visible"
        }>
        {nameError || " "}
      </span>
      <input
        type="text"
        placeholder="О себе"
        value={description || ""}
        className="pop-up__input pop-up__input_user-job"
        name="job-input"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
      />
      <span
        className={
          isInputDescriptionValid
            ? "job-input-error pop-up__input-error"
            : "job-input-error pop-up__input-error pop-up__error_visible"
        }>
        {descriptionError || " "}
      </span>
    </PopupWithForm>
  );
}
