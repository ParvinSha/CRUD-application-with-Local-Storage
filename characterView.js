// let charactersFromLS = [];
// let currentCharacter = {};

// function onPageLoad() {
//     // ta emot parametern från vår url
//     const params = new URLSearchParams(window.location.search);
//     const id = params.get("id");
//     console.log(id);
//     // hämta karaktärer från LS
//     charactersFromLS = JSON.parse(localStorage.getItem('all_characters'));
//     // spara undan karaktären vi är på i den globala variabeln currentCharacter
//     currentCharacter = charactersFromLS.find((element) => element.id === id);
//     renderCharacterToUI();
// };
// onPageLoad();

// function renderCharacterToUI() {
//     // skriva ut bilden på sidan
//     const characterImageEl = document.getElementById('character-image');
//     characterImageEl.setAttribute("src", currentCharacter.image);
//     document.getElementById("header-name").innerText = currentCharacter.name;
//     document.getElementById("character-dateOfBirth").innerText += " " + currentCharacter.dateOfBirth;
//     document.getElementById("character-gender").innerText += " " + currentCharacter.gender;
//     document.getElementById("character-house").innerText += " " + currentCharacter.house;
//     document.getElementById("character-eyeColour").innerText += " " + currentCharacter.hairColour;
//     document.getElementById("character-hairColour").innerText += " " + currentCharacter.hairColour;
//     document.getElementById("character-kommentarer").innerText = currentCharacter.kommentarergraphy ?? "";
// };

//  document.getElementById("character-delete").addEventListener('click', () => {
//     // ta bort current character
//     const filtered = charactersFromLS.filter(character => character.id != currentCharacter.id)
//     // uppdaterar LS all_characters
//     localStorage.setItem("all_characters", JSON.stringify(filtered));
//     // navigera till startsidan
//     window.location.href = `/index.html`;
//      });

// document.getElementById("character-save").addEventListener('click', () => {
//     currentCharacter.kommentarergraphy = document.getElementById("character-kommentarer").value;
//     console.log(currentCharacter.kommentarergraphy);
//     const index = charactersFromLS.findIndex((m) => m.id === currentCharacter.id);
//     charactersFromLS.splice(index, 1, currentCharacter);
//     localStorage.setItem("all_characters", JSON.stringify(charactersFromLS));
//     // navigera till startsidan
//     window.location.href = `/index.html`;
// });  

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

        document.getElementById("character-dateOfBirth").innerHTML = `<strong>Födelsedatum:</strong> ${currentCharacter.dateOfBirth || "Okänt"}`;
        document.getElementById("character-gender").innerHTML = `<strong>Kön:</strong> ${currentCharacter.gender || "Okänt"}`;
        document.getElementById("character-house").innerHTML = `<strong>Hus:</strong> ${currentCharacter.house || "Okänt"}`;
        document.getElementById("character-eyeColour").innerHTML = `<strong>Ögonfärg:</strong> ${currentCharacter.eyeColour || "Okänd"}`;
        document.getElementById("character-hairColour").innerHTML = `<strong>Hårfärg:</strong> ${currentCharacter.hairColour || "Okänd"}`;

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

        window.location.href = `/index.html`;
    } catch (error) {
        console.error(error);
        displayErrorMessage("Ett fel uppstod vid sparning av karaktären.");
    }
});
