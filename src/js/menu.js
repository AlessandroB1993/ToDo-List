import backgroundImg from "../img/thom-bradley-Aqs59hl51DM-unsplash.jpg";

const completeMenu = [
  [
    { food: "Bruschetta al pomodoro", price: 5.5 },
    { food: "Tagliere di Salumi e Formaggi", price: 9.9 },
    { food: "Caprese di Bufala", price: 7.8 },
  ],
  [
    { food: "Spaghetti alla Carbonara", price: 12.0 },
    { food: "Risotto ai Funghi Porcini", price: 13.5 },
    { food: "Petto di Pollo alla Griglia", price: 11.2 },
  ],
  [
    { food: "Tiramisù Classico", price: 6.0 },
    { food: "Panna Cotta ai Frutti di Bosco", price: 5.8 },
    { food: "Torta al Cioccolato Fondente", price: 6.5 },
  ],
];

export function renderMenuPage() {
  // MAIN
  const main = document.createElement("main");
  main.className = "menu-page";

  // HEADING
  const heading = document.createElement("div");
  heading.className = "menu-heading";
  const h1 = document.createElement("h1");
  h1.textContent = "Our Menu";

  // Inserting heading at top of MAIN
  heading.appendChild(h1);
  main.appendChild(heading);

  // MENU
  const menuTable = document.createElement("div");
  menuTable.id = "menu";

  // For each category, we create a list with a category name
  completeMenu.forEach((category, i) => {
    // RECIPE LIST
    const foodList = document.createElement("ol");
    foodList.className = "menu-list";

    // Populating each list with its list elements
    category.forEach((food, j) => {
      const span1 = document.createElement("span");
      span1.className = "menu-list-number";
      const span2 = document.createElement("span");
      span2.className = "food";
      const span3 = document.createElement("span");
      span3.className = "dot-leader";
      const span4 = document.createElement("span");
      span4.className = "price";

      span1.textContent = String(j + 1 + ".");
      span2.textContent = food.food;
      span4.textContent = food.price.toFixed(2) + " €";
      span4.style.color = "rgb(238, 200, 118)";

      // LIST ELEMENT
      const listEl = document.createElement("li");
      listEl.className = "menu-list-element";

      // LIST CONTENT (container with 4 spans: number, foodName, dots, price)
      const menuElement = document.createElement("div");
      menuElement.className = "menu-element";

      menuElement.appendChild(span1);
      menuElement.appendChild(span2);
      menuElement.appendChild(span3);
      menuElement.appendChild(span4);

      listEl.appendChild(menuElement);

      foodList.insertAdjacentElement("beforeend", listEl);
    });

    // MENU CATEGORY (container)
    const menuCategory = document.createElement("div");
    menuCategory.className = "menu-category";

    const heading = document.createElement("h2");
    heading.style.color = "white";
    if (i === 0) heading.textContent = "- Starters -";
    if (i === 1) heading.textContent = "- Main Dishes -";
    if (i === 2) heading.textContent = "- Desserts -";

    menuCategory.insertAdjacentElement("beforeend", heading);
    menuCategory.insertAdjacentElement("beforeend", foodList);
    menuTable.insertAdjacentElement("beforeend", menuCategory);
  });

  main.appendChild(menuTable);

  const pageContent = document.getElementById("content");
  pageContent.appendChild(main);
}
