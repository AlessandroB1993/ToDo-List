export function renderContacts() {
  const h1 = document.createElement("h1");
  h1.textContent = "Contact Us";

  const contactContainer = document.createElement("div");
  contactContainer.className = "contact-us-container";

  contactContainer.insertAdjacentElement(
    "beforeend",
    createContactCard("Chef Tony", "Chef", "333-333333")
  );
  contactContainer.insertAdjacentElement(
    "beforeend",
    createContactCard("Nina Williams", "Cashier", "555-555555")
  );

  const main = document.createElement("main");
  main.id = "contacts-page";
  main.appendChild(h1);
  main.appendChild(contactContainer);

  const pageContent = document.getElementById("content");
  pageContent.appendChild(main);
}

function createContactCard(name, role, number) {
  // CONTACT CARD
  const contactCard = document.createElement("div");
  contactCard.className = "contact-card";

  const fullName = document.createElement("p");
  fullName.className = "contact-full-name";
  fullName.textContent = name;

  const roleName = document.createElement("p");
  roleName.className = "contact-full-name";
  roleName.textContent = role;

  const phoneNum = document.createElement("p");
  phoneNum.className = "contact-phone-num";
  phoneNum.textContent = number;

  contactCard.appendChild(fullName);
  contactCard.appendChild(roleName);
  contactCard.appendChild(phoneNum);

  return contactCard;
}
