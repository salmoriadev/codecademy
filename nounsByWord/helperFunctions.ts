export type Suggestion = {
  word: string;
};

const responseField = document.querySelector(
  "#responseField",
) as HTMLDivElement | null;

const renderFallback = (message: string): void => {
  if (!responseField) {
    return;
  }
  responseField.innerHTML = `<p>${message}</p>`;
};

export const renderResponse = (res: Suggestion[]): void => {
  if (!responseField) {
    return;
  }
  if (!res) {
    renderFallback("Something went wrong. Try again.");
    return;
  }
  if (res.length === 0) {
    responseField.innerHTML =
      "<p>Try again!</p><p>There were no suggestions found.</p>";
    return;
  }

  const wordList: string[] = [];
  for (let i = 0; i < Math.min(res.length, 10); i += 1) {
    wordList.push(`<li>${res[i].word}</li>`);
  }

  responseField.innerHTML =
    `<p>You might be interested in:</p><ol>${wordList.join("")}</ol>`;
};

export const renderRawResponse = (res: Suggestion[]): void => {
  if (!responseField) {
    return;
  }
  const trimmedResponse = res.slice(0, 10);
  responseField.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`;
};

export const renderJsonResponse = (res: Record<string, unknown>): void => {
  if (!responseField) {
    return;
  }
  const rawJson: Record<string, unknown> = {};
  for (const key in res) {
    rawJson[key] = res[key];
  }
  const formattedJson = JSON.stringify(rawJson).replace(/,/g, ", \n");
  responseField.innerHTML = `<pre>${formattedJson}</pre>`;
};
