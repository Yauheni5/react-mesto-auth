import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardDeleteButtonClassName = `card__button-delete ${
    isOwn ? "card__button-delete" : "card__button-delete_inactive"
  }`;
  const cardLikeButtonClassName = `card__button-like ${
    isLiked ? "card__button-like_active" : "card__button-like"
  }`;

  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}>
          <span className="card__like-counter">{card.likes.length}</span>
        </button>
      </div>
    </article>
  );
}
