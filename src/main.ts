import { ContactList} from "./contacts";
import type { PersonContact } from "./contacts";

// Skapa en lista för personliga kontakter
const personalContacts = new ContactList<PersonContact>();

// Hämta DOM-element
const nameInput = document.getElementById("name") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const contactList = document.getElementById("contactList") as HTMLUListElement;

const searchIdInput = document.getElementById("searchId") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;
const searchResult = document.getElementById("searchResult") as HTMLParagraphElement;

// Håller reda på ID:n
let nextId = 1;

// Funktion: rendera listan
function renderContacts() {
  contactList.innerHTML = "";
  personalContacts.getAll().forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.id}: ${c.name} (${c.phone})`;
    contactList.appendChild(li);
  });
}

// Event: Lägg till kontakt
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    alert("Fyll i både namn och telefon!");
    return;
  }

  personalContacts.add({ id: nextId++, name, phone });
  nameInput.value = "";
  phoneInput.value = "";

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
    ? `Hittad: ${contact.name} (${contact.phone})`
    : "Ingen kontakt hittades.";
});
