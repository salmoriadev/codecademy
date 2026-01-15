var _a;
// information to reach API
const apiKey = (_a = window.REBRANDLY_KEY) !== null && _a !== void 0 ? _a : "";
const url = "https://api.rebrandly.com/v1/links";
// Some page elements
const inputField = document.querySelector("#input");
const shortenButton = document.querySelector("#shorten");
const formElement = document.querySelector("#form");
const responseField = document.querySelector("#responseField");
import { renderResponse } from "./helperFunctions.js";
// Asynchronous functions
const shortenUrl = async () => {
    if (!inputField) {
        return;
    }
    const urlToShorten = inputField.value.trim();
    if (!urlToShorten) {
        if (responseField) {
            responseField.innerHTML = "<p>Please enter a URL before shortening.</p>";
        }
        return;
    }
    if (!apiKey) {
        if (responseField) {
            responseField.innerHTML =
                "<p>Missing Rebrandly API key. Set window.REBRANDLY_KEY in public/config.js.</p>";
        }
        return;
    }
    const data = JSON.stringify({ destination: urlToShorten });
    try {
        const response = await fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "Content-type": "application/json",
                apikey: apiKey,
            },
        });
        const jsonResponse = (await response.json());
        if (response.ok) {
            renderResponse(jsonResponse);
            return;
        }
        renderResponse(jsonResponse);
    }
    catch (error) {
        console.log(error);
        if (responseField) {
            responseField.innerHTML =
                "<p>We couldn't reach the service. Please try again.</p>";
        }
    }
};
// Clear page and call Asynchronous functions
const displayShortUrl = (event) => {
    event.preventDefault();
    if (!responseField) {
        return;
    }
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }
    shortenUrl();
};
if (shortenButton) {
    shortenButton.addEventListener("click", displayShortUrl);
}
if (formElement) {
    formElement.addEventListener("submit", displayShortUrl);
}
