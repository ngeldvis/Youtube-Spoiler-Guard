chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    hideSpoilers()
});