(()=>{"use strict";function e(e,t,n,o,r){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),l=c.querySelector(".card__image"),p=c.querySelector(".card__delete-button"),u=c.querySelector(".card__like-button"),a=c.querySelector(".card__image");return c.querySelector(".card__title").textContent=e,l.src=t,l.alt=e,p.addEventListener("click",n),u.addEventListener("click",o),a.addEventListener("click",r),c}function t(e){e.target.closest(".card__like-button").classList.toggle("card__like-button_is-active")}function n(e){e.target.closest(".card").remove()}function o(e){var t=e.querySelector(".popup__close");e.classList.add("popup_is-opened"),e.handleClickClosePopup=function(t){!function(e,t){r(t)}(0,e)},e.handleEscClose=function(t){!function(e,t){"Escape"===e.key&&r(t)}(t,e)},e.handleOutsideClick=function(t){!function(e,t){null===e.target.closest(".popup__content")&&r(t)}(t,e)},t.addEventListener("click",e.handleClickClosePopup),document.addEventListener("keydown",e.handleEscClose),document.addEventListener("mousedown",e.handleOutsideClick)}function r(e){var t=e.querySelector(".popup__close");e.classList.remove("popup_is-opened"),t.removeEventListener("click",e.handleClickClosePopup),document.removeEventListener("keydown",e.handleEscClose),document.removeEventListener("mousedown",e.handleOutsideClick),delete e.handleClickClosePopup,delete e.handleEscClose,delete e.handleOutsideClick}var c=document.querySelector(".content").querySelector(".places__list"),l=document.querySelectorAll(".popup"),p=document.querySelector(".popup_type_edit"),u=p.querySelector(".popup__form"),a=u.querySelector(".popup__input_type_name"),d=u.querySelector(".popup__input_type_description"),s=document.querySelector(".profile"),i=s.querySelector(".profile__title"),_=s.querySelector(".profile__description"),y=s.querySelector(".profile__edit-button");s.querySelector(".profile__image").style.backgroundImage="url(".concat("6666407ac3aa5af1d5de.jpg",")");var m=document.querySelector(".popup_type_new-card"),v=s.querySelector(".profile__add-button"),f=m.querySelector(".popup__form"),k=m.querySelector(".popup__input_type_card-name"),q=m.querySelector(".popup__input_type_url"),S=document.querySelector(".popup_type_image"),h=S.querySelector(".popup__image"),C=S.querySelector(".popup__caption");function g(e){var t=e.target.closest(".card"),n=t.querySelector(".card__image"),r=t.querySelector(".card__title");o(S),h.src=n.src,h.alt=r.textContent,C.textContent=r.textContent}l.forEach((function(e){!function(e){e.classList.add("popup_is-animated")}(e)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(o){c.append(e(o.name,o.link,n,t,g))})),y.addEventListener("click",(function(e){o(p),a.value=i.textContent,d.value=_.textContent})),u.addEventListener("submit",(function(e){e.preventDefault(),i.textContent=a.value,_.textContent=d.value,u.reset(),r(p)})),v.addEventListener("click",(function(e){o(m)})),f.addEventListener("submit",(function(o){c.prepend(e(k.value,q.value,n,t,g)),o.preventDefault(),f.reset(),r(m)}))})();