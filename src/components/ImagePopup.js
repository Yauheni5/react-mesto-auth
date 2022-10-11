export default function ImagePopup(props) {
  const popupActive = "pop-up_active";
  return (
    <div
      className={`pop-up ${props.card ? popupActive : ""} pop-up_view-card`}
      onClick={props.onCloseClick}
    >
      <div className="pop-up__form pop-up__container pop-up__container_view-card pop-up__form-view-card">
        <button
          type="button"
          className="pop-up__close-icon"
          onClick={props.onClose}
        />
        <img
          src={props.card?.link}
          alt={props.card?.name}
          className="pop-up__view-img"
        />
        <h2 className="pop-up__title-view-img">{props.card?.name}</h2>
      </div>
    </div>
  );
}
