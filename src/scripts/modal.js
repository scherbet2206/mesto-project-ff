function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  const closedPopupButton = popup.querySelector(".popup__close");
  closedPopupButton.addEventListener("click", (evt) =>
    handleClickClosePopup(evt, popup)
  );
  document.addEventListener("keydown", (evt) => handleEscClose(evt, popup));
  document.addEventListener("mousedown", (evt) =>
    handleOutsideClick(evt, popup)
  );
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  const closedPopupButton = popup.querySelector(".popup__close");
  closedPopupButton.removeEventListener("click", handleClickClosePopup);
  document.removeEventListener("keydown", handleEscClose);
  document.removeEventListener("mousedown", handleOutsideClick);
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

export { openPopup, animatePopup };
