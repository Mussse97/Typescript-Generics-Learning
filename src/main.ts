import { ContactList } from "./contacts";
import type { PersonContact } from "./contacts";

// Skapa en lista för personliga kontakter
const personalContacts = new ContactList<PersonContact>();

// Hämta DOM-element
const nameInput = document.getElementById("name") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const favoriteCheckbox = document.getElementById("favorite") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const contactList = document.getElementById("contactList") as HTMLUListElement;

const searchIdInput = document.getElementById("searchId") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const searchResult = document.getElementById("searchResult") as HTMLParagraphElement;

// Uppgift lösning - knapp för att visa favoriter
const showFavoritesBtn = document.createElement("button");
showFavoritesBtn.textContent = "Visa favoriter";
document.body.appendChild(showFavoritesBtn);

// Håller reda på ID:n
let nextId = 1;

// Funktion: rendera listan
function renderContacts(contacts?: PersonContact[]) {
  contactList.innerHTML = "";
  const list = contacts ?? personalContacts.getAll();
  list.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.id}: ${c.name} (${c.phone})${c.favorite ? " ⭐" : ""}`;
    contactList.appendChild(li);
  });
}

// Event: Lägg till kontakt
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const favorite = favoriteCheckbox.checked;

  if (!name || !phone) {
    alert("Fyll i både namn och telefon!");
    return;
  }

  personalContacts.add({ id: nextId++, name, phone, favorite });

  // Rensa inputs
  nameInput.value = "";
  phoneInput.value = "";
  favoriteCheckbox.checked = false;

  renderContacts();
});

// Event: Sök kontakt
searchBtn.addEventListener("click", () => {
  const id = Number(searchIdInput.value);
  if (!id) {
    alert("Ange ett giltigt ID!");
    return;
  }

  const contact = personalContacts.getById(id);
  searchResult.textContent = contact
    ? `Hittad: ${contact.name} (${contact.phone})${contact.favorite ? " ⭐" : ""}`
    : "Ingen kontakt hittades.";
});

// uppgift lösning - Event: Visa favoriter
showFavoritesBtn.addEventListener("click", () => {
  const favorites = personalContacts.getFavorites();
  renderContacts(favorites);
});
