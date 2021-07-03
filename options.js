document.onclick = (event) => {
    if(event) {
        if(event.target.matches('#keywords-list .list-item .remove')) {
            let container = event.target.parentNode.parentNode;
            let keyword = container.querySelector('.list-value').textContent;
            removeKeyword(keyword, container)
        }
        if(event.target.matches('#channels-list .list-item .remove')) {
            console.log('remove channel')
        }
        if(event.target.matches('#keywords-list .pin')) {
            let container = event.target.parentNode;
            let keyword = container.querySelector('.list-value').textContent;
            togglePin(keyword, container)
        }
        if(event.target.parentNode.matches('#keywords-list .pin')) {
            let container = event.target.parentNode.parentNode;
            let keyword = container.querySelector('.list-value').textContent;
            togglePin(keyword, container)
        }
    }
}

document.getElementById('new-keyword-form').onsubmit = (event) => {
    event.preventDefault();
    let keywordField = document.getElementById('new-keyword-field');
    let newKeyword = keywordField.value;
    keywordField.value = "";
    options.filteredKeywords.push(newKeyword);
    chrome.storage.sync.set({options});
    addKeywordElement(newKeyword);
}

const options = {};

chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    if(options.filteredKeywords.length > 0) {
        document.getElementById('no-keywords-list-content').classList.add('hide')
        options.filteredKeywords.forEach(keyword => {
            addKeywordElement(keyword);
        });
    }
    let listItems = document.querySelectorAll('#keywords-list .list-item-container');
    options.pinnedKeywords.forEach(keyword => {
        listItems.forEach(item => {
            let value = item.querySelector('.list-item .list-value').textContent;
            if(value === keyword) {
                pinItem(item);
            }
        });
    });
    if(options.filteredChannels.length > 0) {
        document.getElementById('no-channels-list-content').classList.add('hide')
        options.filteredChannels.forEach(channel => {
            document.getElementById('channels-list').append(newListItem(channel, true));
        });
    }
})

// FUNCTIONS

function removeKeyword(keyword, container) {
    options.filteredKeywords = options.filteredKeywords.filter(e => e !== keyword);
    options.pinnedKeywords = options.pinnedKeywords.filter(e => e !== keyword);
    options.disabledPinnedKeywords = options.disabledPinnedKeywords.filter(e => e !== keyword);
    chrome.storage.sync.set({options});
    container.remove();
}

function togglePin(keyword, container) {
    if(container.classList.contains('pinned')) {
        options.pinnedKeywords = options.pinnedKeywords.filter(e => e !== keyword);
        options.disabledPinnedKeywords = options.disabledPinnedKeywords.filter(e => e !== keyword);
        chrome.storage.sync.set({options});
        unpinItem(container);
    } else {
        options.pinnedKeywords.push(keyword);
        chrome.storage.sync.set({options});
        pinItem(container);
    }
}

function addKeywordElement(keyword) {
    document.getElementById('keywords-list').append(newListItem(keyword, false));
}

function newListItem(name, isChannel) {
    let listItemContainer = document.createElement('div');
    listItemContainer.classList.add('list-item-container');

    let listItem = document.createElement('div');
    listItem.classList.add('list-item');
    
    let listValue = document.createElement('div');
    listValue.classList.add('list-value');
    listValue.innerHTML = name;

    let remove = document.createElement('div');
    remove.classList.add('remove');
    remove.innerHTML = 'remove';

    listItem.appendChild(listValue);
    listItem.appendChild(remove);
    listItemContainer.appendChild(listItem);

    if(!isChannel) {
        let pin = document.createElement('div');
        pin.classList.add('pin');
        
        let pinImg = document.createElement('img');
        pinImg.setAttribute('src', 'rsc/images/pin.svg');
        pinImg.setAttribute('height', '20px');
    
        pin.appendChild(pinImg);
        listItemContainer.appendChild(pin);
    }

    return listItemContainer;
}

function pinItem(item) {
    item.classList.add('pinned');
    item.querySelector('.pin img').setAttribute('src', 'rsc/images/pinned.svg');
} 

function unpinItem(item) {
    item.classList.remove('pinned');
    item.querySelector('.pin img').setAttribute('src', 'rsc/images/pin.svg');
}



/* Event Listeners to add
    on add new list item click
    on remove list item
    on pin list item
    on unpin list item
*/