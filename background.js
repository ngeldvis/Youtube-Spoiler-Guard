chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    chrome.tabs.sendMessage(tabId, {
        message: 'pageUpdated'
    })
});