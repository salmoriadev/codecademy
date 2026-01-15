const responseField = document.querySelector("#responseField");
const renderFallback = (message) => {
    if (!responseField) {
        return;
    }
    responseField.innerHTML = `<p>${message}</p>`;
};
export const renderResponse = (res) => {
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
    const wordList = [];
    for (let i = 0; i < Math.min(res.length, 10); i += 1) {
        wordList.push(`<li>${res[i].word}</li>`);
    }
    responseField.innerHTML =
        `<p>You might be interested in:</p><ol>${wordList.join("")}</ol>`;
};
export const renderRawResponse = (res) => {
    if (!responseField) {
        return;
    }
    const trimmedResponse = res.slice(0, 10);
    responseField.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`;
};
export const renderJsonResponse = (res) => {
    if (!responseField) {
        return;
    }
    const rawJson = {};
    for (const key in res) {
        rawJson[key] = res[key];
    }
    const formattedJson = JSON.stringify(rawJson).replace(/,/g, ", \n");
    responseField.innerHTML = `<pre>${formattedJson}</pre>`;
};
