// information to reach API
const apiKey =
  (window as Window & { REBRANDLY_KEY?: string }).REBRANDLY_KEY ?? "";
const url = "https://api.rebrandly.com/v1/links";

// Some page elements
const inputField = document.querySelector("#input") as HTMLInputElement | null;
const shortenButton = document.querySelector(
  "#shorten",
) as HTMLButtonElement | null;
const formElement = document.querySelector("#form") as HTMLFormElement | null;
const responseField = document.querySelector(
  "#responseField",
) as HTMLDivElement | null;

import { renderResponse, type ShortenResponse } from "./helperFunctions.js";

// Asynchronous functions
const shortenUrl = async (): Promise<void> => {
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
    const jsonResponse = (await response.json()) as ShortenResponse;
    if (response.ok) {
      renderResponse(jsonResponse);
      return;
    }
    renderResponse(jsonResponse);
  } catch (error) {
    console.log(error);
    if (responseField) {
      responseField.innerHTML =
        "<p>We couldn't reach the service. Please try again.</p>";
    }
  }
};

// Clear page and call Asynchronous functions
const displayShortUrl = (event: Event): void => {
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
