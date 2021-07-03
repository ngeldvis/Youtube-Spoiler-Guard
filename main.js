/* 
    youtube.com
    youtube.com/feed/explore
    youtube.com/feed/subscriptions
    youtube.com/watch?v=
    youtube.com/results?    


    ytd-grid-video-renderer
        subscriptions

    ytd-rich-item-renderer
        homepage

    ytd-video-renderer
        explore
    
    ytd-compact-video-renderer
        watch
*/

$(document).ready(() => hideSpoilers());
document.addEventListener('yt-navigate-finish', () => hideSpoilers());
document.addEventListener('DOMContentLoaded', () => hideSpoilers());
document.addEventListener('scroll', () => hideSpoilers());
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.message === 'pageUpdated') {
        hideSpoilers();
    }
});

const options = {};

chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
});

let whiteList = []

function hideSpoilers() {
    
    let classSelectors = [
        'ytd-video-renderer',
        'ytd-grid-video-renderer',
        'ytd-rich-item-renderer',
        'ytd-compact-video-renderer'
    ];

    $('ytd-rich-item-renderer').css('position', 'relative');
    
    let videos = $(classSelectors.join());
    
    $.each(videos, function() {
        try {
            let video = $(this);
            let videoTitle = video.find('#video-title').text();
            let thumbnailWidth = video.find('#thumbnail').width()
            let thumbnailHeight = video.find('#thumbnail').height()
            if(hasKeyword(videoTitle) && video.find('.overlay').length === 0) {
                if(removeVideos) {
                    removeVideo(video);
                } else {
                    blurVideo(video, videoTitle, thumbnailWidth, thumbnailHeight);
                }
            }
        } catch(e) {
            console.log('error: ' + e);
        }
    });
}

function hasKeyword(videoTitle) {
    if(whiteList.includes(videoTitle)) {
        return false;
    }
    let foundMatch = false;
    options.filteredKeywords.forEach(keyword => {
        if(videoTitle.toLowerCase().includes(keyword.toLowerCase())) {
            foundMatch = true;
        }
    });
    return foundMatch;
}

function blurVideo(video, videoTitle, width, height) {
    video.find(':first-child').addClass('blur');
    video.append(`
        <div class="overlay">
            <div class="overlay-thumbnail" style="width: ${width}px; height: ${height}px">
                Click to Show
            </div>
        </div>
    `);
    video.find('.overlay').on('click', function() {
        removeOverlay($(this), videoTitle);
    });
}

function removeOverlay(overlay, videoTitle) {
    whiteList.push(videoTitle);
    overlay.parent().find(':first-child').removeClass('blur');
    overlay.remove();
}

function removeVideo(video) {
    video.remove();
}