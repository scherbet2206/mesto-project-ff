import "../pages/index.css";
import imgAvatar from "../images/avatar.jpg";
import { createCard, likeCard, deleteCard } from "./card.js";
import { openPopup, closePopup, animatePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";

import {
  getProfileInfo,
  getInitialCards,
  editProfileInfo,
  createNewCard,
  editAvatar,
} from "./api.js";

let idUser;

const container = document.querySelector(".content");
const cardsContainer = container.querySelector(".places__list");
const allPopups = document.querySelectorAll(".popup");

const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const nameInputPopup = formEditProfile.querySelector(".popup__input_type_name");
const jobInputPopup = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const saveInformationProfileButton =
  formEditProfile.querySelector(".popup__button");

const profileSection = document.querySelector(".profile");
const profileTitle = profileSection.querySelector(".profile__title");
const profileDescription = profileSection.querySelector(
  ".profile__description"
);
const profileEditButton = profileSection.querySelector(".profile__edit-button");
const profileImage = profileSection.querySelector(".profile__image");

const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formEditAvatar = popupEditAvatar.querySelector(".popup__form");
const linkAvatarInputPopup = formEditAvatar.querySelector(
  ".popup__input_type_link-avatar"
);
const saveNewAvatarButton = formEditAvatar.querySelector(".popup__button");
const avatarEditButton = profileSection.querySelector(".profile__image");

const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardButton = profileSection.querySelector(".profile__add-button");
const formNewCard = popupNewCard.querySelector(".popup__form");
const saveNewCardrButton = formNewCard.querySelector(".popup__button");
const nameCardInput = popupNewCard.querySelector(
  ".popup__input_type_card-name"
);
const linkCardInput = popupNewCard.querySelector(".popup__input_type_url");

const popupFullSizeImage = document.querySelector(".popup_type_image");
const imagePopup = popupFullSizeImage.querySelector(".popup__image");
const captionImagePopup = popupFullSizeImage.querySelector(".popup__caption");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

allPopups.forEach(function (popup) {
  animatePopup(popup);
});

function handleFormEditProfileSubmit(evt) {
  evt.preventDefault();
  saveInformationProfileButton.textContent = "Сохранение...";
  editProfileInfo(nameInputPopup.value, jobInputPopup.value)
    .then(() => {
      profileTitle.textContent = nameInputPopup.value;
      profileDescription.textContent = jobInputPopup.value;
      formEditProfile.reset();
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveInformationProfileButton.textContent = "Сохранить";
    });
}

function handleFormEditAvatar(evt) {
  evt.preventDefault();
  saveNewAvatarButton.textContent = "Сохранение...";
  editAvatar(linkAvatarInputPopup.value)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`;
      formEditAvatar.reset();
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveNewAvatarButton.textContent = "Сохранить";
    });
}

function handleFormNewCardSubmit(evt) {
  const newCardName = nameCardInput.value;
  const newCardLink = linkCardInput.value;
  evt.preventDefault();
  saveNewCardrButton.textContent = "Сохранение...";
  createNewCard(newCardName, newCardLink)
    .then((cardInfo) => {
      cardsContainer.prepend(
        createCard(cardInfo, idUser, deleteCard, likeCard, openFullSizeImage)
      );
      formNewCard.reset();
      closePopup(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      saveNewCardrButton.textContent = "Сохранить";
    });
}

function openFullSizeImage(evt) {
  const targetElement = evt.target;
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

avatarEditButton.addEventListener("click", function (evt) {
  clearValidation(popupEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
  linkAvatarInputPopup.value = "";
});
formEditAvatar.addEventListener("submit", handleFormEditAvatar);

newCardButton.addEventListener("click", function (evt) {
  clearValidation(popupNewCard, validationConfig);
  openPopup(popupNewCard);
  nameCardInput.value = "";
  linkCardInput.value = "";
});
formNewCard.addEventListener("submit", handleFormNewCardSubmit);

enableValidation(validationConfig);

Promise.all([getInitialCards(), getProfileInfo()])
  .then(([initialCards, profileData]) => {
    idUser = profileData._id;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;
    initialCards.forEach(function (item) {
      cardsContainer.append(
        createCard(item, idUser, deleteCard, likeCard, openFullSizeImage)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });
