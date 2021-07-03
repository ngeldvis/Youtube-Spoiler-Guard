// set the initial values of the required arrays
chrome.runtime.onInstalled.addListener(async () => {
    chrome.storage.sync.set({
        options: {
            filteredKeywords: [],
            pinnedKeywords: [],
            disabledPinnedKeywords: [],
            filteredChannels: []
        }
    });
});

// send a message that the tab has updated
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    chrome.tabs.sendMessage(tabId, {
        message: 'pageUpdated'
    });
});
