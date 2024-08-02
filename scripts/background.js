chrome.runtime.onInstalled.addListener(() => {
    console.log("Eisenhower Matrix Todo Extension Installed");
});

function performSearch(query) {
    if (!query || query.trim() === "") {
        console.error("Search query is empty");
        return;
    }

    chrome.search.query({ text: query }, function (results) {
        if (chrome.runtime.lastError) {
            console.error("Search query failed:", chrome.runtime.lastError);
        } else {
            console.log("Search results:", results);
        }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "search") {
        performSearch(request.query);
    }
});
