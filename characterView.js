let charactersFromLS = [];
let currentCharacter = {};

function displayErrorMessage(message) {
    const errorContainer = document.getElementById("error-message");
    errorContainer.innerText = message;
    errorContainer.style.color = "red";
    errorContainer.style.fontWeight = "bold";
}

// Funktion som körs vid sidladdning
function onPageLoad() {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        console.log("Karaktär ID:", id);

        // Hämta karaktärer från LS
        const storedCharacters = localStorage.getItem('all_characters');
        if (!storedCharacters) {
            throw new Error("Inga karaktärer hittades i localStorage.");
        }

        charactersFromLS = JSON.parse(storedCharacters);
        if (!Array.isArray(charactersFromLS)) {
            throw new Error("Felaktig data i localStorage.");
        }

        // Hitta den aktuella karaktären
        currentCharacter = charactersFromLS.find((element) => element.id === id);
        if (!currentCharacter) {
            throw new Error("Karaktären hittades inte.");
        }

        renderCharacterToUI();
    } catch (error) {
        console.error(error);
        displayErrorMessage(error.message);
    }
}
onPageLoad();

// Funktion för att rendera karaktärens data till UI
function renderCharacterToUI() {
    try {
        if (!currentCharacter) {
            throw new Error("Ingen karaktär att visa.");
        }

        document.getElementById("character-image").setAttribute("src", currentCharacter.image || "placeholder.jpg");
        document.getElementById("header-name").innerText = currentCharacter.name || "Okänd";

        document.getElementById("character-dateOfBirth").innerHTML = `${currentCharacter.dateOfBirth || "Okänt"}`;
        document.getElementById("character-gender").innerHTML = `${currentCharacter.gender || "Okänt"}`;
        document.getElementById("character-house").innerHTML = `${currentCharacter.house || "Okänt"}`;
        document.getElementById("character-eyeColour").innerHTML = `${currentCharacter.eyeColour || "Okänd"}`;
        document.getElementById("character-hairColour").innerHTML = `${currentCharacter.hairColour || "Okänd"}`;

        document.getElementById("character-kommentarer").value = currentCharacter.kommentarer ?? "";
    } catch (error) {
        console.error(error);
        displayErrorMessage("Ett fel uppstod vid rendering av karaktären.");
    }
}

// Ta bort karaktären
document.getElementById("character-delete").addEventListener('click', () => {
    try {
        if (!currentCharacter) throw new Error("Ingen karaktär att ta bort.");
        
        const filtered = charactersFromLS.filter(character => character.id !== currentCharacter.id);
        localStorage.setItem("all_characters", JSON.stringify(filtered));
        alert("Karaktären har tagits bort.");
        window.location.href = `/index.html`;
    } catch (error) {
        console.error(error);
        displayErrorMessage("Ett fel uppstod vid borttagning av karaktären.");
    }
});

// Spara uppdaterad data
document.getElementById("character-save").addEventListener('click', () => {
    try {
        if (!currentCharacter) throw new Error("Ingen karaktär att spara.");
        
        currentCharacter.kommentarer = document.getElementById("character-kommentarer").value;
        console.log("Sparad kommentar:", currentCharacter.kommentarer);

        const index = charactersFromLS.findIndex((m) => m.id === currentCharacter.id);
        if (index === -1) throw new Error("Karaktären finns inte i localStorage.");

        charactersFromLS.splice(index, 1, currentCharacter);
        localStorage.setItem("all_characters", JSON.stringify(charactersFromLS));
        alert("Karaktären har uppdaterats.");
        window.location.href = `/index.html`;
    } catch (error) {
        console.error(error);
        displayErrorMessage("Ett fel uppstod vid sparning av karaktären.");
    }
});
