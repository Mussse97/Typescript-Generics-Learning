# Typescript kontaktlista med generics
## Grupp 2, Musse, Ismail, Jesper
### Introduktion
Generics används för bygga återanvändbara komponenter.  
I vårat fall har vi valt att använda class och skapat flera metoder i en class (ContactList) som kräver id:number.
Så länge varje objekt, som vi vill använda metoderna med, innehåller id: number så kan vi använda ContactList class.  
Vi skulle i vårat fall kunna återanvända logiken till olika kontakter, vi skulle kunna ha leverantörer och kundkontaker och använda
samma logik så länge de innehåller id: number.

---

### Vanliga fel
1. Felaktig typ vid instansering  
```typescript
export class ContactList<T extends { id: number }> {
private contacts: T[] = [];
```
ContactList kräver ett id: number
```typescript
  interface SimpleContact {
  name: string;
  phone: string;
}

const contacts = new ContactList<SimpleContact>();

  ```
Försöker vi addera detta kommer vi att få felmeddelande:
```
Type 'string' does not satisfy the constraint '{ id: number; }'.
```
---
2. Saknar typargument
```typescript
const contacts = new ContactList();
```
Här har vi glömt att lägga in ett typargument och kommer att få felmeddelande:
```typescript
Generic type 'ContactList<T>' requires 1 type argument(s).
```
Korrekt lösning blir:
```typescript
const contacts = new ContactList<PersonContact>();
```
---
3. Blandar ihop T med ett specifikt typnamn
```typescript
export class ContactList<T extends { id: number }> {
  private contacts: T[] = [];

  printNames(contact: T): void {
    console.log(contact.name); 
    // ❌ Error: Property 'name' does not exist on type 'T'
  }
}
```
Här får vi fel eftersom T bara är garanterad att ha id: number.
Korrekt lösning blir att antingen utöka constrainten:
```typescript
export class ContactList<T extends { id: number; name: string }> {
  private contacts: T[] = [];
}
```
eller använda ett specifikt interface som redan har name:
```typescript
interface PersonContact {
  id: number;
  name: string;
  phone: string;
}

const contacts = new ContactList<PersonContact>();
```
   
---



### Instruktioner för att köra vårat program.
1. Klona repot från github, öppna terminalen och skriv:  
   ``git clone https://github.com/Mussse97/Typescript-Generics-Learning.git``
2. I terminalen skriv:  
   ``cd typescript-generics-learning``
3. Installera dependencies, i terminalen skriv:  
   ``npm install``
4. starta servern, i terminalen skriv:  
   ``npm run dev``

   ---

### Program
   
   Vår kod utgår ifrån vår class ContactList som vi har byggt för att hantera listor med kontakter.
   
   ```typescript
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

   getFavorites(): T[] {
    return this.contacts.filter(c => c.isFavorite);
   }

   removeFavorite(id: number): void {
    const contact = this.getById(id);
    if (contact) {
      contact.isFavorite = false;
    }
   }
   }
```
Detta gör koden:

- Skalbar  
  Vi kan enkelt lägga till nya metoder i klassen för användning.

- Typsäker  
  Typescript kommer att varna oss om vi försöker att lägga till ett felaktigt objekt

- Mindre kod  
  Utan en generisk klass hade vi fått skriva samma kod flera gånger för olika kontaktlistor

---
   
### Uppgift
Er uppgift är att modifiera applikationen så att det går att lägga till favoriter i kontaktlistan.  
Hints:  
`` 1. Kanske behövs det en boolean? 
``  
``
2. Ytterligare en metod ContactList?
``  
``
3. Knapp i UI
``
