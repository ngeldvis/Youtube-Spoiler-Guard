
document.onclick = function click(event) {
    if(event) {
        if(event.target.matches('#keywords-list .list-item .remove')) {
            let keyword = event.target.parentNode.querySelector('.list-value').textContent;
            let container = event.target.parentNode.parentNode;
            removeKeyword(keyword, container)
        }
        if(event.target.matches('#channels-list .list-item .remove')) {
            console.log('remove channel')
        }
        if(event.target.matches('#keywords-list .pin')) {
            console.log('toggle pin')
        }
        if(event.target.parentNode.matches('#keywords-list .pin')) {
            console.log('toggle pin')
        }
    }
}

const options = {};

chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    if(options.filtered_keywords.length > 0) {
        document.getElementById('no-keywords-list-content').classList.add('hide')
        options.filtered_keywords.forEach(keyword => {
            document.getElementById('keywords-list').append(newListItem(keyword));
        });
    }
    let listItems = document.querySelectorAll('#keywords-list .list-item-container');
    options.pinned_keywords.forEach(keyword => {
        listItems.forEach(item => {
            let value = item.querySelector('.list-item .list-value').textContent;
            if(value === keyword) {
                pinItem(item);
            }
        });
    });
    if(options.filtered_channels.length > 0) {
        document.getElementById('no-channels-list-content').classList.add('hide')
        options.filtered_channels.forEach(channel => {
            document.getElementById('channels-list').append(newListItem(channel));
        });
    }
})

function removeKeyword(keyword, container) {
    container.remove();
    options.filtered_keywords = options.filtered_keywords.filter(e => e !== keyword);
    options.pinned_keywords = options.pinned_keywords.filter(e => e !== keyword);
    chrome.storage.sync.set({options});
}

function newListItem(name) {
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

    let pin = document.createElement('div');
    pin.classList.add('pin');
    
    let pinImg = document.createElement('img');
    pinImg.setAttribute('src', 'rsc/images/pin.svg');
    pinImg.setAttribute('height', '20px');

    pin.appendChild(pinImg);
    listItemContainer.appendChild(listItem);
    listItemContainer.appendChild(pin);

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