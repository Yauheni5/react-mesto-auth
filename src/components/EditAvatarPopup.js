import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef("");
  const [inputValid, setInputValid] = React.useState(false);
  const [inputError, setInputError] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);

  const handleChangeInputError = (e) => {
    if (e.target.validity.valid) {
      setInputError("");
      setInputValid(true);
    } else {
      setInputError(e.target.validationMessage);
      setInputValid(false);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    resetAfterConfirm();
  }

  function resetAfterConfirm () {
    setInputValid(false);
    setIsValid(false);
    avatarRef.current.value = "";
  }

  React.useEffect(() => {
    setIsValid(inputValid);
  }, [inputValid]);

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
          inputValid
            ? "url-avatar-input-error pop-up__input-error"
            : "url-avatar-input-error pop-up__input-error pop-up__error_visible"
        }>
        {inputError || " "}
      </span>
    </PopupWithForm>
  );
}
