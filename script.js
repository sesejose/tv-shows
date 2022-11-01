import { url, headers } from "./config.js";

// import "./sass/style.scss";

// "use strict";

init();

async function init() {
  const btnAdd = document.querySelector(".addshow");
  btnAdd.addEventListener("click", addShow);
  showData();
}

//Add Show
// The newShow parameter is based in the argument in the callback function in "Submit"

function addShow(newShow) {
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newShow),
  };

  //Original from insomnia
  // fetch(url, options)
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

  //Created by Jonas
  fetch(url, options)
    .then((res) => res.json())
    .then((data) => {
      showData();
    });
}

// Submit
// The callback function addShow() at the end grab the (obj) as an argument to later uses it in the function addShow()

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let ongoing = false;
  if (form.elements.ongoing.value === "yes") {
    ongoing = true;
  }
  const obj = {
    genres: form.elements.genres.value.split("\n"),
    seasons: form.elements.seasons.value,
    director: form.elements.director.value,
    rating: form.elements.rating.value,
    ongoing: ongoing,
    name: form.elements.name.value,
  };
  addShow(obj);
});

async function showData() {
  const data = await getShows(); // Await: It makes the code wait until the promise returns a result.
  console.log(data);
  data.forEach((element) => {
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".name").textContent = element.name;
    copy.querySelector(".genres").textContent = element.genres;
    copy.querySelector(".seasons").textContent = element.seasons;
    copy.querySelector(".rating").textContent = element.rating;
    copy.querySelector(".ongoing").textContent = element.ongoing;
    copy.querySelector(".description").textContent = element.description;
    copy.querySelector(".director").textContent = element.director;
    const button = copy.querySelector("button");
    button.addEventListener("click", () => {
      deleteShow(element.id);
    });

    document.querySelector(".grid-articles").appendChild(copy);
  });
}

// Get Shows // Wherever we use AWAIT we need to use ASYNC
async function getShows() {
  const options = {
    method: "GET",
    headers: headers,
  };

  //Original code from insomnia
  // fetch(url, options)
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

  //Created by Jonas but does not work!
  // fetch(url, options)
  //   .then((response) => response.json())
  //   .then((response) => {
  //     return response;
  //   })
  //   .catch((err) => console.error(err));

  // Await then execute the code.
  const res = await fetch(url, options); // Fetchs the data (await)
  const data = await res.json(); //When id done get it?
  return data; // Is this returned "data/array" used in the showData(); function ?? Confused again.
}

// function updateShow() {
//   const options = {
//     method: "PATCH",
//     headers: headers,
//     body: '{"directors":"Patch New Director"}',
//   };

//   fetch(url, options)
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));
// }

function deleteShow(id) {
  const options = {
    method: "DELETE",
    headers: headers,
    body: "false",
  };
  console.log(id);

  fetch(url + "?id=eq." + id, options)
    .then((response) => response.json())
    .then((data) => {
      showData();
    })
    .catch((err) => console.error(err));
}
