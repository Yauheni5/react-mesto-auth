import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef("");
  const [isValidInput, setIsValidInput] = React.useState(false);
  const [inputError, setInputError] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);

  const handleChangeInputError = (e) => {
    if (e.target.validity.valid) {
      setInputError("");
      setIsValidInput(true);
    } else {
      setInputError(e.target.validationMessage);
      setIsValidInput(false);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function resetInputValues() {
    setIsValidInput(false);
    setIsValid(false);
    avatarRef.current.value = "";
  }

  React.useEffect(() => {
    resetInputValues();
  }, [isOpen, onClose]);

  React.useEffect(() => {
    setIsValid(isValidInput);
  }, [isValidInput]);

  return (
    <PopupWithForm
      name={`edit-avatar`}
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}>
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="pop-up__input pop-up__input_url-avatar"
        name="url-avatar-input"
        ref={avatarRef || ""}
        required
        onChange={handleChangeInputError}
      />
      <span
        className={
          isValidInput
            ? "url-avatar-input-error pop-up__input-error"
            : "url-avatar-input-error pop-up__input-error pop-up__error_visible"
        }>
        {inputError || " "}
      </span>
    </PopupWithForm>
  );
}
