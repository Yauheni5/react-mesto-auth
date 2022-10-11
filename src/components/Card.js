export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="card">
      <img
        src={props.card.link}
        alt={props.card.name}
        className="card__image"
        onClick={handleClick}
      />
      <button className="card__button-delete" />
      <div className="card__caption">
        <h2 className="card__title">{props.card.name}</h2>
        <button className="card__button-like">
          <span className="card__like-counter">{props.card.likes.length}</span>
        </button>
      </div>
    </article>
  );
}
