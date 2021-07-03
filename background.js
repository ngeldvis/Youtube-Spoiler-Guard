chrome.runtime.onInstalled.addListener(async () => {
    chrome.storage.sync.set({
        options: {
            filteredKeywords: [
                'Loki',
                'Infinity War',
                'Endgame',
                'Black Widow',
                'Minecraft',
                'Bad Batch',
                'manhunt',
                'toyota'
            ],
            pinnedKeywords: [
                'Loki',
                'Endgame',
                'Black Widow'
            ],
            disabledPinnedKeywords: [
                'Endgame'
            ],
            filteredChannels: [
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
