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
            let value = item.querySelector('.list-item').textContent;
            if(value === keyword) {
                item.classList.add('pinned');
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

function newListItem(name) {
    let listItemContainer = document.createElement('div');
    listItemContainer.classList.add('list-item-container');

    let listItem = document.createElement('div');
    listItem.classList.add('list-item');
    listItem.innerHTML = name;

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



/* Event Listeners to add
    on add new list item click
    on remove list item
    on pin list item
    on unpin list item
*/