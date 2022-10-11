export default function PopupWithForm (props) {
  const popupActive = 'pop-up_active';

  return (
    <div className={`pop-up ${props.isOpen && popupActive} pop-up_${props.name}`} onClick={props.onCloseClick}>
      <form className = {`pop-up__container pop-up__form pop-up__form-${props.name} `} name={`form-${props.name}`} noValidate>
        <h2 className="pop-up__title">{props.title}</h2>
        {props.children}
        <button type="submit" className="pop-up__button pop-up__button-save">Сохранить</button>
        <button type="button" className="pop-up__close-icon" onClick={props.onClose}></button>
      </form>
    </div>
  )
}
