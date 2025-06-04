import "../styles.css";
import backgroundImg from "../img/thom-bradley-Aqs59hl51DM-unsplash.jpg";
import { renderHomepage } from "./homepage";
import { renderMenuPage } from "./menu";
import { renderContacts } from "./contacts";

// DOM ELEMENTS
const body = document.querySelector("body");
const pageContent = document.getElementById("content");
const navBar = document.getElementById("navbar");
const imgEl = document.createElement("img");

// BACKGROUND IMAGE
function renderBackgroundImage() {
  const imageContainer = document.createElement("div");
  const homepageImg = backgroundImg;
  imgEl.src = homepageImg;
  imgEl.id = "homepage-img";

  imageContainer.id = "image-wrapper";
  imageContainer.appendChild(imgEl);

  body.insertAdjacentElement("beforeend", imageContainer);
}

// RENDER HOMEPAGE ON FIRST LOAD
document.addEventListener("DOMContentLoaded", () => {
  renderBackgroundImage();
  renderHomepage();
});

// MAKE THE SITE DINAMYC
navBar.addEventListener("click", (e) => {
  const value = e.target.dataset.page;
  if (!value) return;

  pageContent.innerHTML = "";

  switch (value) {
    case "home":
      renderHomepage();
      break;
    case "menu":
      renderMenuPage();
      break;
    case "contacts":
      renderContacts();
      break;
  }
});
