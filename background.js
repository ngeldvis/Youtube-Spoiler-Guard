chrome.runtime.onInstalled.addListener(async () => {
    chrome.storage.sync.set({
        options: {
            filtered_keywords: [
                'Loki',
                'Infinity War',
                'Endgame',
                'Black Widow',
                'Minecraft',
                'Bad Batch',
                'manhunt',
                'toyota'
            ],
            pinned_keywords: [
                'Loki',
                'Endgame',
                'Black Widow'
            ],
            filtered_channels: [
                'Marvel Studios',
                'Star Wars'
            ]
        }
    });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    chrome.tabs.sendMessage(tabId, {
        message: 'pageUpdated'
    });
});
