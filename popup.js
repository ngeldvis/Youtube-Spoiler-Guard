document.onclick = function click(event) {
    if(event) {
        if(event.target.matches('.pin-toggle')) {
            togglePin(event.target, event.target.innerHTML)
        }
    }
}

let optionsLink = document.getElementById('options-link');
optionsLink.addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});

const options = {};

chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
    let grid = document.getElementById('pinned-grid');
    if(options.pinnedKeywords.length > 0) {
        options.pinnedKeywords.forEach(keyword => {
            grid.appendChild(newPinToggle(keyword));
        });
    }
});

/**
 * create new pin toggle element
 * @param value corresponding keyword
 * @return new pin toggle element
 */
function newPinToggle(value) {
    let pinToggle = document.createElement('div');
    pinToggle.classList.add('pin-toggle');
    if(options.disabledPinnedKeywords.includes(value)) {
        pinToggle.classList.add('disabled');
    }
    pinToggle.innerHTML = value;
    return pinToggle;
}

/**
 * toggle whether keyword should be included in keyword filters 
 * @param el html element
 * @param value keyword string
 */
function togglePin(el, value) {
    if(el.classList.contains('disabled')) {
        options.disabledPinnedKeywords = options.disabledPinnedKeywords.filter(e => e !== value)
        chrome.storage.sync.set({options});
        el.classList.remove('disabled');
    } else {
        options.disabledPinnedKeywords.push(value);
        chrome.storage.sync.set({options});
        el.classList.add('disabled');
    }
}
