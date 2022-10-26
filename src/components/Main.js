import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const cardsElements = cards.map((item) => {
    return (
      <Card
        card={item}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDelete={onCardDelete}
        key={item._id}
      />
    );
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__img-wrapper" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__user">{currentUser.name}</h1>
          <p className="profile__user-job">{currentUser.about}</p>
          <button
            type="button"
            className="profile__button profile__button_edit"
            onClick={onEditProfile}
          />
        </div>
        <button
          type="button"
          className="profile__button profile__button_add"
          onClick={onAddPlace}
        />
      </section>
      <section className="cards" aria-label="Места">
        {cardsElements}
      </section>
    </main>
  );
}
