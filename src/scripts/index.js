import "../pages/index.css";
import { initialCards } from "./cards.js";
import imgAvatar from "../images/avatar.jpg";
import { createCard, likeCard, deleteCard, openFullSizeImage } from "./card.js";
import { openPopup, closePopup, animatePopup } from "./modal.js";

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
profileImage.style.backgroundImage = `url(${imgAvatar})`;

const popupNewCard = document.querySelector(".popup_type_new-card");
const newCardButton = profileSection.querySelector(".profile__add-button");
const formNewCard = popupNewCard.querySelector(".popup__form");

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
  closePopup(popupNewCard);
}

profileEditButton.addEventListener("click", function (evt) {
  openPopup(popupEditProfile);
  nameInputPopup.value = profileTitle.textContent;
  jobInputPopup.value = profileDescription.textContent;
});

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);

newCardButton.addEventListener("click", function (evt) {
  openPopup(popupNewCard);
});
formNewCard.addEventListener("submit", handleFormNewCardSubmit);
