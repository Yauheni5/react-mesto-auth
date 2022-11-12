import React, { useEffect, useState } from "react";
import { textButtonPopup, textTitlePopup } from "../utils/constants";

export default function Login({ onRegisterUser }) {
  const [email, setEmail] = useState("");
  const [isInputEmailValid, setIsInputEmailValid] = useState(false);
  const [emailErrorTextInput, setEmailTextInputError] = useState("");
  const [password, setPassword] = useState("");
  const [isInputPasswordValid, setIsInputPasswordValid] = useState(false);
  const [passwordErrorTextInput, setPasswordInputTextError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChangeInputError = (e, setInputError, setInputValid) => {
    if (e.target.validity.valid) {
      setInputError("");
      setInputValid(true);
    } else {
      setInputError(e.target.validationMessage);
      setInputValid(false);
    }
  };

  function handleChangeEmail(e) {
    handleChangeInputError(
      e,
      setEmailTextInputError,
      setIsInputEmailValid,
      onRegisterUser
    );
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    handleChangeInputError(
      e,
      setPasswordInputTextError,
      setIsInputPasswordValid
    );
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    isValid && onRegisterUser({ email: email, password: password });
  }

  useEffect(() => {
    setIsValid(isInputEmailValid && isInputPasswordValid);
  }, [isInputEmailValid, isInputPasswordValid]);

  return (
    <main className="content">
      <section className="identification">
        <form
          className="identification__form"
          onSubmit={handleSubmit}
          noValidate>
          <h1 className="identification__title">{textTitlePopup.logged}</h1>
          <input
            className="identification__input identification__input_email"
            placeholder="Email"
            type="email"
            required
            onChange={handleChangeEmail}
          />
          <span className="identification__span-error email-input-error">
            {emailErrorTextInput}
          </span>
          <input
            className="identification__input identification__input_password"
            placeholder="Пароль"
            type="password"
            required
            minLength="6"
            maxLength="40"
            onChange={handleChangePassword}
          />
          <span className="identification__span-error password-input-error">
            {passwordErrorTextInput}
          </span>
          <button
            type="submit"
            className={`identification__button identification__button_save ${
              isValid ? "" : "identification__button_inactive"
            }`}>
            {textButtonPopup.logged}
          </button>
        </form>
      </section>
    </main>
  );
}
