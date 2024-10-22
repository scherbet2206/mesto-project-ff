const cardTemplate = document.querySelector("#card-template").content;
const container = document.querySelector(".content");
const addButton = container.querySelector(".profile__add-button");
const cardsList = container.querySelector(".places__list");

function addCard(title, linkImage) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = title;
  cardElement.querySelector(".card__image").src = linkImage;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  cardsList.append(cardElement);
}

function deleteCard(event) {
  const deletedCard = event.target.parentElement;
  deletedCard.remove();
}

initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});
