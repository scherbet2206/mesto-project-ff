import "../pages/index.css";
import { initialCards } from "./cards.js";
import imgAvatar from "../images/avatar.jpg";
import { createCard, likeCard, deleteCard } from "./card.js";
import { openPopup, closePopup, animatePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";

const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");
const allPopups = document.querySelectorAll(".popup");

const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const nameInputPopup = formEditProfile.querySelector(".popup__input_type_name");
const jobInputPopup = formEditProfile.querySelector(
  ".popup__input_type_description"
);

const profileSection = document.querySelector(".profile");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description"
);
const profileEditButton = profileSection.querySelector(".profile__edit-button");
const profileImage = profileSection.querySelector(".profile__image");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

profileImage.style.backgroundImage = `url(${imgAvatar})`;

const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardButton = profileSection.querySelector(".profile__add-button");
const formNewCard = popupNewCard.querySelector(".popup__form");

const nameCardInput = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const linkCardInput = popupNewCard.querySelector(".popup__input_type_url");

const popupFullSizeImage = document.querySelector(".popup_type_image");
const imagePopup = popupFullSizeImage.querySelector(".popup__image");
const captionImagePopup = popupFullSizeImage.querySelector(".popup__caption");

allPopups.forEach(function (popup) {
  animatePopup(popup);
});

initialCards.forEach(function (item) {
  cardsContainer.append(
    createCard(item.name, item.link, deleteCard, likeCard, openFullSizeImage)
  );
});

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputPopup.value;
  profileDescription.textContent = jobInputPopup.value;
  formEditProfile.reset();
  closePopup(popupEditProfile);
}

function handleFormNewCardSubmit(evt) {
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
  closePopup(popupNewCard);
}

function openFullSizeImage(event) {
  const targetElement = event.target;
  const card = targetElement.closest(".card");
  const imageCard = card.querySelector(".card__image");
  const imageCaption = card.querySelector(".card__title");
  openPopup(popupFullSizeImage);
  imagePopup.src = imageCard.src;
  imagePopup.alt = imageCaption.textContent;
  captionImagePopup.textContent = imageCaption.textContent;
}

profileEditButton.addEventListener("click", function (evt) {
  clearValidation(popupEditProfile, validationConfig);
  openPopup(popupEditProfile);
  nameInputPopup.value = profileTitle.textContent;
  jobInputPopup.value = profileDescription.textContent;
});

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);

newCardButton.addEventListener("click", function (evt) {
  clearValidation(popupNewCard, validationConfig);
  openPopup(popupNewCard);
  nameCardInput.value = "";
  linkCardInput.value = "";
});

formNewCard.addEventListener("submit", handleFormNewCardSubmit);

enableValidation(validationConfig);
