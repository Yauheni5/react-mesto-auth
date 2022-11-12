import { useEffect, useState } from "react";
import { textButtonPopup } from "../utils/constants";

export default function PopupWithForm({
  isOpen,
  onCloseClick,
  name,
  title,
  children,
  onSubmit,
  isValid,
}) {
  const popupActive = "pop-up_active";
  const [buttonText, setButtonText] = useState("Сохранить");

  useEffect(() => {
    if (name === "edit-avatar" || name === "edit-profile") {
      return setButtonText(textButtonPopup.save);
    } else if (name === "add-card") {
      return setButtonText(textButtonPopup.add);
    } else if (name === "delete-card") {
      return setButtonText(textButtonPopup.confirm);
    } // eslint-disable-next-line
  }, [name]);

  return (
    <div
      className={`pop-up ${isOpen && popupActive} pop-up_${name}`}
      onClick={onCloseClick}>
      <form
        className={`pop-up__container pop-up__form pop-up__form-${name} `}
        name={`form-${name}`}
        onSubmit={onSubmit}>
        <h2 className="pop-up__title">{title}</h2>
        {children}
        <button
          type="submit"
          className={
            isValid
              ? "pop-up__button pop-up__button-save"
              : "pop-up__button pop-up__button-save pop-up__button_inactive"
          }>
          {buttonText}
        </button>
        <button
          type="button"
          className="pop-up__close-icon"
          onClick={onCloseClick}
        />
      </form>
    </div>
  );
}
