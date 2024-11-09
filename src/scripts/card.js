import {
  deleteCardFromServer,
  likeCardOnServer,
  dislikeCardOnServer,
} from "./api.js";

function createCard(itemCard, myId, deleteCard, likeCard, openFullSizeImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikesCount = cardElement.querySelector(".card__like-count");
  const openFullSizeImageButton = cardElement.querySelector(".card__image");

  cardElement.id = itemCard._id;
  cardTitle.textContent = itemCard.name;
  cardImage.src = itemCard.link;
  cardImage.alt = itemCard.name;
  cardLikesCount.textContent = itemCard.likes.length;
  if (itemCard.owner._id == myId) {
    deleteButton.addEventListener("click", () =>
      deleteCard(itemCard._id, cardElement)
    );
  } else {
    deleteButton.classList.add("card__delete-button-hide");
  }

  if (itemCard.likes.some((userInfo) => userInfo._id == myId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    likeCard(itemCard._id, likeButton, cardLikesCount)
  );
  openFullSizeImageButton.addEventListener("click", openFullSizeImage);
  return cardElement;
}

function likeCard(idCard, cardLikeButton, cardLikesCount) {
  if (!cardLikeButton.classList.contains("card__like-button_is-active")) {
    likeCardOnServer(idCard)
      .then((res) => {
        cardLikesCount.textContent = res.likes.length;
        cardLikeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  } else {
    dislikeCardOnServer(idCard)
      .then((res) => {
        cardLikesCount.textContent = res.likes.length;
        cardLikeButton.classList.toggle("card__like-button_is-active");
      })
      .catch((err) => {
        console.log(`Что-то пошло не так: ${err}`);
      });
  }
}

function deleteCard(cardID, deletedCard) {
  deleteCardFromServer(cardID)
    .then(() => {
      deletedCard.remove();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так: ${err}`);
    });
}

export { createCard, likeCard, deleteCard };
