// En generisk kontaktlista
// T måste ha id (number) och kan ha isFavorite (boolean)
export class ContactList<T extends { id: number; isFavorite?: boolean }> {
  private contacts: T[] = []; // lagrar alla kontakter

  add(contact: T): void {
    this.contacts.push(contact); // lägg till ny kontakt
  }

  getAll(): T[] {
    return this.contacts; // returnera alla kontakter
  }

  findById(id: number): T | undefined {
    return this.contacts.find(c => c.id === id); // hitta kontakt via id
  }

  removeById(id: number): void {
    this.contacts = this.contacts.filter(c => c.id !== id); // ta bort kontakt via id
  }

  getFavorites(): T[] {
    return this.contacts.filter(c => c.isFavorite); // returnera bara favoriter
  }

  removeFavorite(id: number): void {
    const contact = this.findById(id); // hitta kontakt via id
    if (contact) {
      contact.isFavorite = false; // sätt favorit till false
    }
  }
}


