export default function ImagePopup({ card, onCloseClick }) {
  return (
    <div
      className={`pop-up ${card ? "pop-up_active" : ""} pop-up_view-card`}
      onClick={onCloseClick}>
      <div className="pop-up__form pop-up__container pop-up__container_view-card pop-up__form-view-card">
        <button
          type="button"
          className="pop-up__close-icon"
          onClick={onCloseClick}
        />
        <img src={card?.link} alt={card?.name} className="pop-up__view-img" />
        <h2 className="pop-up__title-view-img">{card?.name}</h2>
      </div>
    </div>
  );
}
