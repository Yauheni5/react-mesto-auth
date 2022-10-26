import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [nameValid, setNameValid] = React.useState(true);
  const [descriptionValid, setDescriptionValid] = React.useState(true);
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
    handleChangeInputError(e, setNameError, setNameValid);
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    handleChangeInputError(e, setDescriptionError, setDescriptionValid);
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setIsValid(nameValid && descriptionValid);
  }, [nameValid, descriptionValid]);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about); // eslint-disable-next-line
  }, [currentUser]);

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
          nameValid
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
          descriptionValid
            ? "job-input-error pop-up__input-error"
            : "job-input-error pop-up__input-error pop-up__error_visible"
        }>
        {descriptionError || " "}
      </span>
    </PopupWithForm>
  );
}
