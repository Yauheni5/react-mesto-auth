import { useEffect, useState } from "react";

export default function PopupWithForm (props) {
  const popupActive = 'pop-up_active';
  const [buttonText, setButtonText] = useState('Сохранить');

  useEffect(() => {
    if (props.name === "edit-avatar" || props.name === "edit-profile") {
      return setButtonText(textButton.save);
    } else if (props.name === "add-card") {
      return setButtonText(textButton.add);
    } else if (props.name === "delete-card") {
      return setButtonText(textButton.confirm)
    }
  }, [props.name])

  const textButton ={
    save: "Сохранить",
    add: "Добавить",
    confirm: "Да",
    loading: "Сохранение"
  };

  return (
    <div className={`pop-up ${props.isOpen && popupActive} pop-up_${props.name}`} onClick={props.onCloseClick}>
      <form className = {`pop-up__container pop-up__form pop-up__form-${props.name} `} name={`form-${props.name}`}>
        <h2 className="pop-up__title">{props.title}</h2>
        {props.children}
        <button type="submit" className="pop-up__button pop-up__button-save">{buttonText}</button>
        <button type="button" className="pop-up__close-icon" onClick={props.onClose}></button>
      </form>
    </div>
  );
}
