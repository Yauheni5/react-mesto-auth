import React, { useEffect } from 'react';
import avatarUser from '../images/avatarKusto.jpg'
import { newApi } from '../utils/Api'
import Card from './Card';

export default function Main (props){

  const [userName, setUserName] = React.useState('Evgeniy Asheichyk');
  const [userDescription, setUserDescription] = React.useState('Frontend Developer');
  const [userAvatar, setUserAvatar] = React.useState({avatarUser});
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    newApi.getUserInfoApi()
    .then((res)=>{
      setUserName(res.name);
      setUserDescription(res.about);
      setUserAvatar(res.avatar);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
    newApi.getInitialCards()
    .then((res)=>{
      setCards(res);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__img-wrapper">
          <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__info">
          <h1 className="profile__user">{userName}</h1>
          <p className="profile__user-job">{userDescription}</p>
          <button type="button" className="profile__button profile__button_edit" onClick={props.onEditProfile}></button>
        </div>
        <button type="button" className="profile__button profile__button_add" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards" aria-label="Места">
      {cards.map((item) => {
        return <Card card={item} onCardClick={props.onCardClick} key ={item._id}/>
      })}
      </section>
    </main>
  )
}
