import "../pages/index.css";
import { initialCards } from "./cards.js";
import imgAvatar from "../images/avatar.jpg";

const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${imgAvatar})`;

const cardTemplate = document.querySelector("#card-template").content;
const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");

const popupFullSizeImage = document.querySelector(".popup_type_image");

const allPopups = document.querySelectorAll(".popup");
allPopups.forEach(function (item){
  item.classList.add("popup_is-animated");
});

function createCard(title, linkImage, deleteCard, likeCard, openFullSizeImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = title;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = linkImage;
  cardImage.alt = title;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", likeCard);

  const openFullSizeImageButton = cardElement.querySelector(".card__image");
  openFullSizeImageButton.addEventListener("click", openFullSizeImage);
  return cardElement;
}

function likeCard(event) {
  const targetElement = event.target;
  const likeCard = targetElement.closest(".card__like-button");
  likeCard.classList.toggle("card__like-button_is-active");
}

function deleteCard(event) {
  const targetElem = event.target;
  const deletedCard = targetElem.closest(".card");
  deletedCard.remove();
}

function openFullSizeImage(event){
  const targetElement = event.target;
  const card = targetElement.closest(".card");
  const imageCard = card.querySelector(".card__image");
  const imageCaption = card.querySelector(".card__title");

  openPopup(popupFullSizeImage);
  const imagePopup = popupFullSizeImage.querySelector(".popup__image");
  const captionImagePopup = popupFullSizeImage.querySelector(".popup__caption");
  imagePopup.src = imageCard.src;
  captionImagePopup.textContent = imageCaption.textContent;
}

initialCards.forEach(function (item) {
  cardsContainer.append(
    createCard(item.name, item.link, deleteCard, likeCard, openFullSizeImage)
  );
});

//// ------------------------------------------------------------------/////

const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const nameInputPopup = popupEditProfile.querySelector(
  ".popup__input_type_name"
);
const jobInputPopup = popupEditProfile.querySelector(
  ".popup__input_type_description"
);

const profileSection = document.querySelector(".profile");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description"
);
const profileEditButton = profileSection.querySelector(".profile__edit-button");

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

profileEditButton.addEventListener("click", function (evt) {
  openPopup(popupEditProfile);
  nameInputPopup.value = profileTitle.textContent;
  jobInputPopup.value = profileDescription.textContent;
  formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
});

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputPopup.value;
  profileDescription.textContent = jobInputPopup.value;
  formEditProfile.reset();
  popupEditProfile.classList.remove("popup_is-opened");
}

//// ------------------------------------------------------------------/////
const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardButton = profileSection.querySelector(".profile__add-button");
const formNewCard = popupNewCard.querySelector(".popup__form");

newCardButton.addEventListener("click", function (evt) {
  openPopup(popupNewCard);
  formNewCard.addEventListener("submit", handleFormNewCardSubmit);
});

function handleFormNewCardSubmit(evt) {
  const nameCardInput = popupNewCard.querySelector(
    ".popup__input_type_card-name"
  );
  const linkCardInput = popupNewCard.querySelector(".popup__input_type_url");
  cardsContainer.prepend(
    createCard(
      nameCardInput.value,
      linkCardInput.value,
      deleteCard,
      likeCard,
      openFullSizeImage
    )
  );

  evt.preventDefault();
  formNewCard.reset();
  popupNewCard.classList.remove("popup_is-opened");
}

//// ------------------------------------------------------------------/////

