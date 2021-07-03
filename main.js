$(document).ready(() => hideSpoilers());

document.addEventListener('yt-navigate-finish', () => hideSpoilers());
document.addEventListener('DOMContentLoaded', () => hideSpoilers());
document.addEventListener('scroll', () => hideSpoilers());

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.message === 'pageUpdated') {
        hideSpoilers();
    }
});

removeVideos = false;

const options = {};

chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);
});

// list of videos that the user has clicked on and chosen to show
let whiteList = []

/** 
 * hide all video elements that make user's filters 
 */
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

            let thumbnailWidth = video.find('#thumbnail').width();
            let thumbnailHeight = video.find('#thumbnail').height();

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

/**
 * function that determines whether or not to hide a given video based on its title
 * @param videoTitle title of the youtube video
 * @returns true is video is to be hidden | false otherwise
 */
function hasKeyword(videoTitle) {
    if(whiteList.includes(videoTitle)) {
        return false;
    }
    let foundMatch = false;
    options.filteredKeywords.filter(e => !options.disabledPinnedKeywords.includes(e)).forEach(keyword => {
        if(videoTitle.toLowerCase().includes(keyword.toLowerCase())) {
            foundMatch = true;
        }
    });
    return foundMatch;
}

/**
 * adds a blur effect for a video
 * @param video video html element
 * @param videoTitle title of the video
 * @param width width of the video's thumbnail
 * @param height height of the video's thumbnail
 */
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

/**
 * removes the hidden video overlay
 * @param overlay overlay html element
 * @param videoTitle video's title
 */
function removeOverlay(overlay, videoTitle) {
    whiteList.push(videoTitle);
    overlay.parent().find(':first-child').removeClass('blur');
    overlay.remove();
}

/**
 * removes the given video from the page
 * @param video video html element 
 */
function removeVideo(video) {
    video.remove();
}
