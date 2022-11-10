import React from "react";
import unSuccessfullRegistration from "../images/unSuccessfullRegistration.svg";
import successfullRegistration from "../images/successfullRegistration.svg";

export default function InfoTooltip({
  isOpen,
  onCloseClick,
  isSuccessfullRegistration,
  textIsSuccessfullRegistration,
}) {
  return (
    <div
      className={`pop-up ${isOpen && "pop-up_active"} pop-up_tooltip`}
      onClick={onCloseClick}>
      <div className={`pop-up__container pop-up__container_tooltip `}>
        <img
          src={
            isSuccessfullRegistration
              ? successfullRegistration
              : unSuccessfullRegistration
          }
          className="pop-up__image"
        />
        <p className="pop-up__text">{textIsSuccessfullRegistration}</p>
        <button
          type="button"
          className="pop-up__close-icon"
          onClick={onCloseClick}
        />
      </div>
    </div>
  );
}
