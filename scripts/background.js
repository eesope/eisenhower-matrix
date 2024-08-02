chrome.runtime.onInstalled.addListener(() => {
    console.log("Eisenhower Matrix Todo Extension Installed");
});

function performSearch(query) {
    chrome.search.query({ text: query }, function (results) {
        console.log("Search results:", results);
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "search") {
        performSearch(request.query);
    }
});
