Redovisning av Applikationen

1. Introduktion till Applikationen

Applikationen hämtar Harry Potter-karaktärer från ett API till en Lokal Storage och ger användarna möjlighet att lägga till saknade karaktärer. Dessutom kan användaren uppdatera vilken karaktär som helst genom att lägga till kommentarer eller ta bort den också.
Det valda temat är Harry Potter-karaktärer.

API-val: "https://hp-api.onrender.com/api/characters" valdes eftersom det innehåller detaljerad information om karaktärer från Harry Potter-serien och är lätt att integrera med JavaScript. Det är också ett publik API och inte kräver någon Access Key, så det är enkelt för andra om de vill ladda ner och köra Applikationen.


2. Översikt av Funktionaliteten

CRUD-operationer

Create: Användaren kan lägga till en ny karaktär via ett formulär som sparar datan i localStorage.

Read: Applikationen hämtar karaktärer från API:et eller från localStorage och renderar dem i UI:t.

Update: Användaren kan redigera information om en karaktär, inklusive kommentarer.

Delete: Karaktärer kan tas bort från localStorage, vilket gör att de försvinner från applikationen.

Local Storage

Används för att lagra hämtade karaktärer så att de finns kvar mellan sessioner.

Lagrar även användarskapade karaktärer och eventuella ändringar av data.

API-integration

Data hämtas asynkront från API:et med fetch().

Felhantering säkerställer att en fallback-mekanism används vid problem med API:et.

3. Felhantering och Användarfeedback

Felmeddelanden: Visas i UI om API-anrop misslyckas eller om localStorage innehåller felaktig data.

Formulärvalidering: Säkerställer att användaren fyller i nödvändiga fält innan data sparas.

Undantagshantering: try-catch används för att förhindra att sidan kraschar vid oväntade fel.

4. Användargränssnitt och Design

UI-design: Enkla, klickbara kort som visar karaktärer och deras skådespelare.

Responsivitet: Designad för att fungera på både mobil och desktop.

Estetik: CSS används för att skapa ett visuellt tilltalande gränssnitt, med placeholder-bilder för saknade bilder.

5. Kodstruktur och Kvalitet

Struktur: Koden är uppdelad i funktioner för att vara lättläst och underhållbar.

Kommentarer: Finns i hela koden för att underlätta förståelsen.

Avancerade tekniker:

async/await används för att hantera API-anrop.

try-catch används för felhantering.

localStorage används för att lagra data lokalt.

6. Utmaningar och Lösningar

Local Storage: Problem med att uppdatera och radera objekt löstes genom att använda unika id-värden för varje karaktär.

Felhantering: Användning av try-catch och tydliga felmeddelanden gjorde att applikationen kunde hantera oväntade situationer.

7. Reflektion och Lärdomar

Lärdomar: Bättre förståelse för API-anrop, localStorage och felhantering.

Tekniker och Verktyg: Förbättrad skicklighet i JavaScript, asynkrona anrop och DOM-manipulation.

Förbättringsmöjligheter:

Använda en backend-databas istället för localStorage.

Implementera en sökfunktion för karaktärer.

Förbättra UI med mer interaktiv design och animationer.

Implementera att ha karaktärlista på olika sidor

