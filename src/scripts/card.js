import { openPopup } from "./modal";

function createCard(title, linkImage, deleteCard, likeCard, openFullSizeImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const openFullSizeImageButton = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__title").textContent = title;
  cardImage.src = linkImage;
  cardImage.alt = title;

  deleteButton.addEventListener("click", deleteCard);
  likeButton.addEventListener("click", likeCard);
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

function openFullSizeImage(event) {
  const targetElement = event.target;
  const card = targetElement.closest(".card");
  const imageCard = card.querySelector(".card__image");
  const imageCaption = card.querySelector(".card__title");
  const popupFullSizeImage = document.querySelector(".popup_type_image");
  const imagePopup = popupFullSizeImage.querySelector(".popup__image");
  const captionImagePopup = popupFullSizeImage.querySelector(".popup__caption");
  openPopup(popupFullSizeImage);
  imagePopup.src = imageCard.src;
  captionImagePopup.textContent = imageCaption.textContent;
}

export { createCard, likeCard, deleteCard, openFullSizeImage };
