export type ShortenResponse = {
  shortUrl?: string;
  errors?: unknown;
};

const responseField = document.querySelector(
  "#responseField",
) as HTMLDivElement | null;

// Manipulates responseField to render a formatted and appropriate message
export const renderResponse = (res: ShortenResponse): void => {
  if (!responseField) {
    return;
  }
  // Displays either message depending on results
  if (res.errors) {
    responseField.innerHTML =
      "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
  } else {
    responseField.innerHTML = `<p>Your shortened url is: </p><p> ${res.shortUrl} </p>`;
  }
};

// Manipulates responseField to render an unformatted response
export const renderRawResponse = (res: ShortenResponse): void => {
  if (!responseField) {
    return;
  }
  // Displays either message depending on results
  if (res.errors) {
    responseField.innerHTML =
      "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
  } else {
    // Adds line breaks for JSON
    let structuredRes = JSON.stringify(res).replace(/,/g, ", \n");
    structuredRes = `<pre>${structuredRes}</pre>`;
    responseField.innerHTML = `${structuredRes}`;
  }
};

// Renders the JSON that was returned when the Promise from fetch resolves.
export const renderJsonResponse = (response: Record<string, unknown>): void => {
  if (!responseField) {
    return;
  }
  // Creates an empty object to store the JSON in key-value pairs
  const rawJson: Record<string, unknown> = {};
  for (const key in response) {
    rawJson[key] = response[key];
  }
  // Converts JSON into a string and adding line breaks to make it easier to read
  const formattedJson = JSON.stringify(rawJson).replace(/,/g, ", \n");
  // Manipulates responseField to show the returned JSON.
  responseField.innerHTML = `<pre>${formattedJson}</pre>`;
};
