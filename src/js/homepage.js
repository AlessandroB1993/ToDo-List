export function renderHomepage() {
  const homeContentContainer = document.createElement("div");
  homeContentContainer.className = "main-content";

  const heading = document.createElement("h1");
  heading.textContent = "The Chef's House";

  const para = document.createElement("p");
  para.textContent = " We cook special recipes for your special tastes";

  homeContentContainer.appendChild(heading);
  homeContentContainer.appendChild(para);

  const main = document.createElement("main");
  main.appendChild(homeContentContainer);

  const pageContent = document.getElementById("content");
  pageContent.appendChild(main);
}
