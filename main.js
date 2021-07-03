/* 
    youtube.com
    youtube.com/feed/explore
    youtube.com/feed/subscriptions
    youtube.com/watch?v=
    youtube.com/results?    


    ytd-grid-video-renderer
        .ytd-grid-renderer
        .yt-horizontal-list-renderer

    ytd-rich-item-renderer
        .ytd-rich-grid-renderer
        .ytd-rich-shelf-renderer

    ytd-video-renderer
        .ytd-expanded-shelf-contents-renderer
        .ytd-item-section-renderer
    
    ytd-compact-video-renderer
        .ytd-item-section-renderer
*/

const filters = [
    'Loki',
    'Infinity War',
    'Black Widow',
    'Minecraft',
    'Bad Batch'
]

let classSelectors = [
    'ytd-video-renderer',
    'ytd-grid-video-renderer',
    'ytd-rich-item-renderer'
];

let videos = $(classSelectors.join());

$.each(videos, function() {
    try {
        let videoTitle = $(this).find('#video-title').text();
        if(blurVideo(videoTitle)) {
            $(this).find(':first-child').addClass('blur')
            $(this).append('<div class="overlay">Click to Show</div>')
            $(this).find('.overlay').on('click', function() {
                $(this).parent().find(':first-child').removeClass('blur')
                $(this).remove();
            });
        }
    } catch {
        console.log('error');
    }
});

function blurVideo(videoTitle) {
    let foundMatch = false;
    filters.forEach(keyword => {
        if(videoTitle.toLowerCase().includes(keyword.toLowerCase())) {
            foundMatch = true;
        }
    });
    return foundMatch;
}
