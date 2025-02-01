console.log("Koden är länkad");
const BASE_URL = "https://hp-api.onrender.com/api/characters";
const charactersContainerEl = document.getElementById('characters-container');

// Funktion för att visa felmeddelanden i UI:t
function displayErrorMessage(message) {
    charactersContainerEl.innerHTML = `<p class="error-message">${message}</p>`;
}

// Funktion för att hämta data från API:et
async function fetchCharacters() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
            throw new Error(`Fel vid hämtning av data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        
        if (!Array.isArray(data) || data.length === 0) {
            throw new Error("Tom eller ogiltig data från API:et.");
        }

        // Spara svaret i localStorage
        localStorage.setItem("all_characters", JSON.stringify(data));
        return data;
    }
    catch (error) {
        console.error(error);
        displayErrorMessage("Något gick fel vid hämtning av karaktärer. Försök igen senare.");
        return null;
    }
}

// Funktion för att kontrollera om data finns i localStorage
async function checkCharacters() {
    try {
        let all_characters = JSON.parse(localStorage.getItem("all_characters"));
        
        if (Array.isArray(all_characters) && all_characters.length > 0) {
            renderCharactersToUI(all_characters);
        } else {
            const fetchedCharacters = await fetchCharacters();
            if (fetchedCharacters) {
                renderCharactersToUI(fetchedCharacters);
            }
        }
    } catch (error) {
        console.error("Fel vid kontroll av karaktärer:", error);
        displayErrorMessage("Ett oväntat fel uppstod. Försök att ladda om sidan.");
    }
}

// Funktion för att rendera karaktärer till UI:t
function renderCharactersToUI(characters) {
    charactersContainerEl.innerHTML = ""; // Rensa container innan ny rendering

    if (!characters || characters.length === 0) {
        displayErrorMessage("Inga karaktärer kunde laddas.");
        return;
    }

    characters.forEach((character) => {
        const characterContainerEl = document.createElement('article');

        // Eventlyssnare för att navigera till karaktärens sida
        characterContainerEl.addEventListener("click", () => {
            console.log(character);
            window.location.href = `/characterView.html?id=${encodeURIComponent(character.id)}`;
        });

        // Skapa element för bilden
        const characterImgEl = document.createElement('figure');
        characterImgEl.style.backgroundImage = `url(${character.image || 'placeholder.jpg'})`; // Standardbild om ingen finns
        
        const name = document.createElement('p');
        name.innerHTML = `<span class="rt-score">${character.name || "Okänd"}</span>`;
        characterImgEl.appendChild(name);
        
        characterContainerEl.appendChild(characterImgEl);

        // Lägg till actor på characterkortet
        const actorEl = document.createElement('h3');
        actorEl.innerText = character.actor || "Ingen skådespelare angiven";
        characterContainerEl.appendChild(actorEl);

        // Lägg till elementet i vår HTML
        charactersContainerEl.appendChild(characterContainerEl);
    });
}

// Kör checkCharacters vid start
checkCharacters();
