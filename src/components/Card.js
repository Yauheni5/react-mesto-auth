export default function Card (props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
  <article className="card" key={props.card._id} onClick={handleClick}>
    <img src={props.card.link} alt={props.card.name} className="card__image" />
    <button className="card__button-delete"></button>
    <div className="card__caption">
      <h2 className="card__title">{props.card.name}</h2>
      <button className="card__button-like"><span className="card__like-counter">{props.card.likes.length}</span></button>
    </div>
  </article>)
}
