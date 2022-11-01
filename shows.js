import { url, headers } from "./config.js";

// import "./sass/style.scss";

// "use strict";

async function getShows() {
  // Why is async function ???
  const options = {
    method: "GET",
    headers: headers,
  };

  //Original code from insomnia
  // fetch(url, options)
  //   .then((response) => response.json())
  //   .then((response) => console.log(response))
  //   .catch((err) => console.error(err));

  //Created by Jonas and does not work!
  // fetch(url, options)
  //   .then((response) => response.json())
  //   .then((response) => {
  //     return response;
  //   })
  //   .catch((err) => console.error(err));

  //Jonas make a new one AWAIT, why?
  // Wherever we use AWAIT we need to use ASYNC
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
  //After that he creates the init Function to test if it works
}

function addShow() {
  const options = {
    method: "POST",
    headers: headers,
    body: '{"id":4,"created_at":"2022-10-24T09:01:22.863572+00:00","genres":["Horror","Crime","Mystery"],"name":"The Outsider","seasons":1,"director":"Martin Zandvliet","rating":3.2,"ongoing":true,"description":"Lorem ipsum"}',
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
    .then((response) => {
      showData();
    })
    .catch((err) => console.error(err));
}

async function init() {
  const btnAdd = document.querySelector(".addshow");
  btnAdd.addEventListener("click", addShow);
  showData();
}

async function showData() {
  const data = await getShows();
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

    document.querySelector("main").appendChild(copy);
  });
}

init();
