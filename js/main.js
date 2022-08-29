import { userData } from "./userData.js";

const rootBox = document.querySelector(".root");
const cardItem = document.createElement("ul");
cardItem.setAttribute("id", "card__item");
rootBox.append(cardItem);

const renderCard = (object) => {
  let userCard = document.createElement("li");
  userCard.setAttribute("class", "user__card");
  userCard.setAttribute("data-card", `${object._id}`);
  userCard.setAttribute("data-age", `${object.age}`);

  userCard.innerHTML = `
        
    <div class="card" data-card-id="${object._id}" style="width: 16rem;">
      <ul div class="card-body">
      <li><img src="https://via.placeholder.com/150" class="card-img-center" alt="..."></li>  
       <li><h5 class="card-title user__name">${object.name}</h5></li> 
       <li><p class="card-text">${object.age}</p></li> 
       <li><p class="card-text">Gender: ${object.gender}</p></li> 
       <li><p class="card-text">Balance: ${object.balance}</p></li> 
    </ul>
</div>
     `;
  cardItem.append(userCard);
};

userData.forEach((element) => {
  renderCard(element);
});

let nameItem = document.querySelectorAll(".card");

document.querySelector("#search").addEventListener("input", (event) => {
  let enteredValue = event.target.value.toLowerCase();
  if (enteredValue != "") {
    nameItem.forEach((elem) => {
      let searchElem = elem.innerText.toLowerCase();
      if (searchElem.search(enteredValue) == -1) {
        elem.classList.add("hide");
      } else {
        elem.classList.remove("hide");
      }
    });
  } else {
    nameItem.forEach((elem) => {
      elem.classList.remove("hide");
    });
  }
});

let list = document.getElementById("card__item");
let optionsArea = document.querySelectorAll("option");
let optionDefault = document.getElementById("def");
let optionYoung = document.getElementById("young");
let optionOlder = document.getElementById("older");
let items = list.childNodes;
let itemsArr = [];

for (let i in items) {
  if (items[i].nodeType == 1) {
    // get rid of the whitespace text nodes
    itemsArr.push(items[i]);
  }
}

const sortByYoung = () => {
  itemsArr.sort(function (a, b) {
    return a.dataset.age == b.dataset.age
      ? 0
      : a.dataset.age > b.dataset.age
      ? 1
      : -1;
  });
};

const sortByOlder = () => {
  itemsArr.sort(function (a, b) {
    return a.dataset.age == b.dataset.age
      ? 0
      : a.dataset.age < b.dataset.age
      ? 1
      : -1;
  });
};

const render = () => {
  for (let i = 0; i < itemsArr.length; ++i) {
    list.appendChild(itemsArr[i]);
  }
};

const sortByAges = () => {
  if (optionYoung.selected) {
    sortByYoung();
    render();
    console.log(list);
    console.log(itemsArr);
  } else if (optionOlder.selected) {
    sortByOlder();
    render();
  }
};

document.addEventListener("change", sortByAges);

/**Creating users modal window */

const modalWindowWrapper = document.createElement("div");
rootBox.append(modalWindowWrapper);
modalWindowWrapper.setAttribute("class", "modal__window");

const prodCard = document.querySelectorAll(".card");

prodCard.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    let modalWindow = document.querySelectorAll(`.modal`);
    if (event.target.classList.contains("card")) {
      userData.forEach((element) => {
        let modal = document.createElement("div");
        modalWindowWrapper.append(modal);
        modal.innerHTML = `
  <div class="modal" data-card-id='${element._id}'>
  <div class="modal__img">
  </div>
  <div class="modal__info">
      <h4>${element.name}</h4>
    <p>User gender:<span>${element.gender}</span></p>
    <p>User eyecolor: <span>${element.eyeColor}</span></p>
    <p>Company:<span>${element.company}</span></p>
    <p>E-mail: <span>${element.email} cm</span></p>
    <p>Phone: <span>${element.phone} cm</span></p>
    <p>Address: <span>${element.address} cm</span></p>
    <p>About: ${element.about}</p>
  </div>
</div>`;
      });

      modalWindow.forEach((element) => {
        if (event.target.dataset.cardId == element.dataset.cardId) {
          element.style = "display:block";
          modalWindowWrapper.style = "display:block";
          modalWindowWrapper.addEventListener("click", (event) => {
            element.style = "visibility:hidden";
            modalWindowWrapper.style = "display:none";
          });
        }
      });
    }
  });
});
