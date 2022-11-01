import { url, headers } from "./config.js";

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
      console.log(data);
    });
}

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
