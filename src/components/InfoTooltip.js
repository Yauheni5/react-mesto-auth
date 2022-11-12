import React from "react";
import unSuccessfullRegistration from "../images/unSuccessfullRegistration.svg";
import successfullRegistration from "../images/successfullRegistration.svg";

export default function InfoTooltip({
  isOpen,
  onCloseClick,
  infoToolTipStatus
}) {
  return (
    <div
      className={`pop-up ${isOpen && "pop-up_active"} pop-up_tooltip`}
      onClick={onCloseClick}>
      <div className={`pop-up__container pop-up__container_tooltip `}>
        <img
          src={
            infoToolTipStatus.status === true
              ? successfullRegistration
              : unSuccessfullRegistration
          }
          className="pop-up__image"
          alt={infoToolTipStatus.status ? "Изображение подтверждения" : "Изображение ошибка"}
        />
        <p className="pop-up__text">{infoToolTipStatus.text}</p>
        <button
          type="button"
          className="pop-up__close-icon"
          onClick={onCloseClick}
        />
      </div>
    </div>
  );
}
