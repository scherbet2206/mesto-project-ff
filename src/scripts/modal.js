function openPopup(popup) {
  const closedPopupButton = popup.querySelector(".popup__close");

  popup.classList.add("popup_is-opened");

  popup.handleClickClosePopup = function (evt) {
    handleClickClosePopup(evt, popup);
  };
  popup.handleEscClose = function (evt) {
    handleEscClose(evt, popup);
  }
  popup.handleOutsideClick = function (evt) {
    handleOutsideClick(evt, popup);
  }

  closedPopupButton.addEventListener("click", popup.handleClickClosePopup);
  document.addEventListener("keydown", popup.handleEscClose);
  document.addEventListener("mousedown", popup.handleOutsideClick);
}

function closePopup(popup) {
  const closedPopupButton = popup.querySelector(".popup__close");

  popup.classList.remove("popup_is-opened");
  closedPopupButton.removeEventListener("click", popup.handleClickClosePopup);
  document.removeEventListener("keydown", popup.handleEscClose);
  document.removeEventListener("mousedown", popup.handleOutsideClick);

  delete popup.handleClickClosePopup;
  delete popup.handleEscClose;
  delete popup.handleOutsideClick;
}

function handleClickClosePopup(evt, popup) {
  closePopup(popup);
}

function handleEscClose(evt, popup) {
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}

function handleOutsideClick(evt, popup) {
  if (evt.target.closest(".popup__content") === null) {
    closePopup(popup);
  }
}

function animatePopup(popup) {
  popup.classList.add("popup_is-animated");
}

export { openPopup, closePopup, animatePopup };
