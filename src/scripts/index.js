import "../pages/index.css"
import { initialCards } from "./cards.js";
import imgAvatar from "../images/avatar.jpg";

const profileImage = document.querySelector(".profile__image");
profileImage.style.backgroundImage = `url(${imgAvatar})`;

const cardTemplate = document.querySelector("#card-template").content;
const container = document.querySelector(".content");
const addButton = container.querySelector(".profile__add-button");
const cardsContainer = container.querySelector(".places__list");

function createCard(title, linkImage, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = title;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = linkImage;
  cardImage.alt = title;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

function deleteCard(event) {
  const targetElem = event.target;
  const deletedCard = targetElem.closest(".card");
  deletedCard.remove();
}

initialCards.forEach(function (item) {
  cardsContainer.append(createCard(item.name, item.link, deleteCard));
});
