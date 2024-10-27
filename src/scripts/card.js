import { openPopup } from "./modal";

function createCard(title, linkImage, deleteCard, likeCard, openFullSizeImage) {
  const cardTemplate = document.querySelector("#card-template").content;
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

function openFullSizeImage(event) {
  const targetElement = event.target;
  const card = targetElement.closest(".card");
  const imageCard = card.querySelector(".card__image");
  const imageCaption = card.querySelector(".card__title");
  const popupFullSizeImage = document.querySelector(".popup_type_image");
  openPopup(popupFullSizeImage);
  const imagePopup = popupFullSizeImage.querySelector(".popup__image");
  const captionImagePopup = popupFullSizeImage.querySelector(".popup__caption");
  imagePopup.src = imageCard.src;
  captionImagePopup.textContent = imageCaption.textContent;
}

export { createCard, likeCard, deleteCard, openFullSizeImage };
