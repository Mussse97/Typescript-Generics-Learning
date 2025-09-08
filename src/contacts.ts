export interface PersonContact {
  id: number;
  name: string;
  phone: string;
  email?: string;
  // uppgift lösning
   favorite?: boolean; // ny egenskap
}

export class ContactList<T extends { id: number; favorite?: boolean }> {
  private contacts: T[] = [];

  add(contact: T): void {
    this.contacts.push(contact);
  }

  getAll(): T[] {
    return this.contacts;
  }

  getById(id: number): T | undefined {
    return this.contacts.find(c => c.id === id);
  }
  // uppgift lösning
   getFavorites(): T[] {
    return this.contacts.filter(c => c.favorite);
  }
}
