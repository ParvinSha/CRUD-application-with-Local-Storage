const BASE_URL = "https://hp-api.onrender.com/api/characters";
let all_characters = JSON.parse(localStorage.getItem("all_characters")) || [];
const charactersContainerEl = document.getElementById('characters-container');
const characterFormEl = document.getElementById('character-form');
const characterModalEl = document.getElementById('character-modal');
const closeModalEl = document.getElementById('close-modal');

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

// Öppna modalen för att lägga till en karaktär
document.getElementById("character-add").addEventListener("click", () => {
    characterModalEl.style.display = "block";
});

// Stäng modalen
closeModalEl.addEventListener("click", () => {
    characterModalEl.style.display = "none";
});

// Hantera formulärinmatning och lägga till en ny karaktär
characterFormEl.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
        const formData = new FormData(characterFormEl);
        const newCharacter = {
            id: crypto.randomUUID(),
            name: formData.get("name") || "Okänd",
            gender: formData.get("gender") || "Okänt",
            house: formData.get("house") || "Okänt",
            dateOfBirth: formData.get("dateOfBirth") || "Okänt",
            eyeColour: formData.get("eyeColour") || "Okänt",
            hairColour: formData.get("hairColour") || "Okänt",
            actor: formData.get("actor") || "Okänt",
            image: formData.get("image") || "https://ik.imagekit.io/hpapi/harry.jpg"
        };

        all_characters.unshift(newCharacter);
        localStorage.setItem("all_characters", JSON.stringify(all_characters));
        renderCharactersToUI(all_characters);
        characterModalEl.style.display = "none"; // Stäng modalen efter tillägg
    } catch (error) {
        console.error(error);
        displayErrorMessage("Ett fel uppstod vid tilläggning av karaktären.");
    }
});

// Kör checkCharacters vid start
checkCharacters();
