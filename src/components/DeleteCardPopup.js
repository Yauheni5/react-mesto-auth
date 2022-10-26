import React from 'react'
import PopupWithForm from './PopupWithForm'

export default function DeleteCardPopup({ isOpen, onClose, onConfirmDelete}) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirmDelete();
  }
  return (
    <PopupWithForm
            isValid={true}
            isOpen={isOpen}
            name={`delete-card`}
            title="Вы уверены?"
            onClose={onClose}
            onSubmit={handleSubmit}
          />
  )
}
