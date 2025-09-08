import { ContactList } from "./contactList";
import type { PersonalContact, BusinessContact } from "./contact";

// Skapa listor
const personalContacts = new ContactList<PersonalContact>();
const businessContacts = new ContactList<BusinessContact>();

// Hämta DOM-element för personliga kontakter
const nameInput = document.getElementById("name") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const personalList = document.getElementById("personalList") as HTMLUListElement;

// Hämta DOM-element för business kontakter
const companyInput = document.getElementById("company") as HTMLInputElement;
const contactPersonInput = document.getElementById("contactPerson") as HTMLInputElement;
const businessEmailInput = document.getElementById("businessEmail") as HTMLInputElement;
const addBusinessBtn = document.getElementById("addBusinessBtn") as HTMLButtonElement;
const businessList = document.getElementById("businessList") as HTMLUListElement;

// Hämta DOM-element för sökning
const searchIdInput = document.getElementById("searchId") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const searchResult = document.getElementById("searchResult") as HTMLParagraphElement;

// ID-räknare
let nextPersonalId = 1;
let nextBusinessId = 1;

// Funktion: rendera personliga kontakter
function renderPersonal() {
  personalList.innerHTML = "";
  personalContacts.getAll().forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.id}: ${c.name} (${c.phone}) ${c.isFavorite ? "⭐" : ""}`;

    const favBtn = document.createElement("button");
    favBtn.textContent = c.isFavorite ? "Ta bort favorit" : "Favorisera";
    favBtn.addEventListener("click", () => {
      if (c.isFavorite) {
        personalContacts.removeFavorite(c.id);
      } else {
        c.isFavorite = true;
      }
      renderPersonal();
    });

    li.appendChild(favBtn);
    personalList.appendChild(li);
  });
}

// Funktion: rendera business kontakter
function renderBusiness() {
  businessList.innerHTML = "";
  businessContacts.getAll().forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.id}: ${c.company} - ${c.contactPerson} (${c.email}) ${c.isFavorite ? "⭐" : ""}`;

    const favBtn = document.createElement("button");
    favBtn.textContent = c.isFavorite ? "Ta bort favorit" : "Favorisera";
    favBtn.addEventListener("click", () => {
      if (c.isFavorite) {
        businessContacts.removeFavorite(c.id);
      } else {
        c.isFavorite = true;
      }
      renderBusiness();
    });

    li.appendChild(favBtn);
    businessList.appendChild(li);
  });
}

// Event: Lägg till personlig kontakt
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    alert("Fyll i både namn och telefon!");
    return;
  }

  personalContacts.add({
    id: nextPersonalId++,
    name,
    phone,
    email: "",
    relation: "vän",
    isFavorite: false,
  });

  nameInput.value = "";
  phoneInput.value = "";

  renderPersonal();
});

// Event: Lägg till business kontakt
addBusinessBtn.addEventListener("click", () => {
  const company = companyInput.value.trim();
  const contactPerson = contactPersonInput.value.trim();
  const email = businessEmailInput.value.trim();

  if (!company || !contactPerson || !email) {
    alert("Fyll i företag, kontaktperson och email!");
    return;
  }

  businessContacts.add({
    id: nextBusinessId++,
    company,
    contactPerson,
    email,
    isFavorite: false,
  });

  companyInput.value = "";
  contactPersonInput.value = "";
  businessEmailInput.value = "";

  renderBusiness();
});

// Event: Sök kontakt (söker i båda listor)
searchBtn.addEventListener("click", () => {
  const id = Number(searchIdInput.value);
  if (!id) {
    alert("Ange ett giltigt ID!");
    return;
  }

  const personal = personalContacts.findById(id);
  const business = businessContacts.findById(id);

  if (personal) {
    searchResult.textContent = `Hittad personlig: ${personal.name} (${personal.phone})`;
  } else if (business) {
    searchResult.textContent = `Hittad business: ${business.company} (${business.contactPerson})`;
  } else {
    searchResult.textContent = "Ingen kontakt hittades.";
  }
});

// Rendera första gången
renderPersonal();
renderBusiness();

