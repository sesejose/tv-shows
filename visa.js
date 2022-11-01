import "./sass/style.scss";

const form = document.querySelector("form");

// event input --> takes the value from name and paste in directors
form.elements.name.addEventListener("input", () => {
  form.elements.directors.value = form.elements.name.value;
});

// Card

const formVisa = document.querySelector("#visa");

formVisa.elements.card.addEventListener("input", () => {
  if (formVisa.elements.card.value.length === 16) {
    console.log("16 reached");
    //formVisa.elements.card.blur(); // It's does not necessary. With the next line it becomes automaticlaly blured
    formVisa.elements.date.focus();
  }
});

formVisa.elements.date.addEventListener("input", () => {
  if (formVisa.elements.date.value.length === 2) {
    console.log("2 reached");
    formVisa.elements.expire.focus();
  }
});
