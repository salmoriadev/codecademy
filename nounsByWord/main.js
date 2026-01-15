import { renderResponse } from "./helperFunctions.js";
// Information to reach API
const url = "https://api.datamuse.com/words?";
const queryParams = "rel_jja=";
// Selecting page elements
const inputField = document.querySelector("#input");
const submitButton = document.querySelector("#submit");
const responseField = document.querySelector("#responseField");
const formElement = document.querySelector("#nounForm");
// Asynchronous function
const getSuggestions = async () => {
    if (!inputField) {
        return;
    }
    const wordQuery = inputField.value.trim();
    if (!wordQuery) {
        if (responseField) {
            responseField.innerHTML =
                "<p>Type a word first and then hit explore.</p>";
        }
        return;
    }
    const endpoint = url + queryParams + encodeURIComponent(wordQuery);
    try {
        const response = await fetch(endpoint, { cache: "no-cache" });
        if (response.ok) {
            const jsonResponse = (await response.json());
            renderResponse(jsonResponse);
            return;
        }
        if (responseField) {
            responseField.innerHTML =
                "<p>We could not reach the word service. Try again.</p>";
        }
    }
    catch (error) {
        console.log(error);
        if (responseField) {
            responseField.innerHTML =
                "<p>We could not reach the word service. Try again.</p>";
        }
    }
};
// Clear previous results and display results to webpage
const displaySuggestions = (event) => {
    event.preventDefault();
    if (!responseField) {
        return;
    }
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }
    void getSuggestions();
};
if (submitButton) {
    submitButton.addEventListener("click", displaySuggestions);
}
if (formElement) {
    formElement.addEventListener("submit", displaySuggestions);
}
