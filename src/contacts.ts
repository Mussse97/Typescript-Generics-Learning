export interface PersonContact {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

export class ContactList<T extends { id: number }> {
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

}
