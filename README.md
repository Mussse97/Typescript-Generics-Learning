# Typescript kontaktlista med generics
## Grupp 2, Mostafa, Ismail, Jesper
### Introduktion
När vi bygger program vill vi vara effektiva och återanvända kod istället för att skriva samma kod flera gånger för olika typer av data,
då kan vi använda generics.  
Utan generics hade vi behövt skriva två olika klasser:  
- PersonalContactList  
- BusinessContactList
  
Dessa klasser skulle ha väldigt snarlik kod men hanterar olika typer av objekt.
Istället kan vi skriva en klass ContactList<T>.  
T fungerar som en platshållare för typen som vi tänker använda.

```typescript
  const personalContacts = new ContactList<PersonalContact>();
  const businessContacts = new ContactList<BusinessContact>();
```
Här skapar vi två nya listor och bestämmer vilken typ T ska vara.
Nu kan vi använda metoder och logik från klassen ContactList och typescript ser till att vi inte blandar ihop dom.

Exempel utan generics:  
```typescript
class PersonalContactList {
  private contacts: PersonalContact[] = [];

  add(contact: PersonalContact): void {
    this.contacts.push(contact);
  }

  getAll(): PersonalContact[] {
    return this.contacts;
  }

  findById(id: number): PersonalContact | undefined {
    return this.contacts.find(c => c.id === id);
  }
}

class BusinessContactList {
  private contacts: BusinessContact[] = [];

  add(contact: BusinessContact): void {
    this.contacts.push(contact);
  }

  getAll(): BusinessContact[] {
    return this.contacts;
  }

  findById(id: number): BusinessContact | undefined {
    return this.contacts.find(c => c.id === id);
  }
}

```
Exempel med generics och en enskild ContacList:
```typescript
class ContactList<T extends { id: number }> {
  private contacts: T[] = [];

  add(contact: T): void {
    this.contacts.push(contact);
  }

  getAll(): T[] {
    return this.contacts;
  }

  findById(id: number): T | undefined {
    return this.contacts.find(c => c.id === id);
  }
}
```

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
Er uppgift är att modifiera applikationen så att det går att lägga till favoriter i kontaktlistan. När en kontakt finns i listan ska man kunna klicka på en stjärna bredvid kontakten för att favoritisera dem. 

Hints:  

1. Vi kan i nuläget inte garantera att ``T`` vet att ``isFavorite`` existerar. Därför behöver vi extenda ``ContactsList`` med ``isFavorite. `` med rätt typ.

2. För att kunna filtrera fram favoriter behöver ``T`` känna till att det finns en egenskap ``isFavorite``. Fundera på hur du kan utöka constrainten på ``T`` så att metoden kan returnera bara de kontakter där ``c.isFavorite`` är true. Detta kan vi lyckas med under ``ContaktsList`` klassen med en extra GetFavorit function kanske?


3. En knapp kommer att behövas för i vår ui för att slutföra uppgiften. Under ``renderPersonal`` och ``rednerBusiness`` i main.ts behöver ni skapa ett button element, göra att ``c.isFavorite`` är true och sedan anropa ``rednerPersonal`` funktionen.




