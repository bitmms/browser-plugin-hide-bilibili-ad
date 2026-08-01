// ==========================================================================================
// ==========================================================================================
// ========================================== 需要根据变化动态执行的部分

// 隐藏广告
function hideAds() {
    let selector = [
        '.video-card-ad-small',
        '#slide_ad',
        '.ad-report',
        '.ad-floor-exp',
        '.left-entry .v-popover-wrap:nth-last-child(-n+2)',
        '.favlist-aside .vui_collapse .fav-collapse:nth-last-child(1)',
        '.favlist-aside .vui_collapse .fav-collapse:nth-last-child(3)',
        '.favlist-aside .vui_collapse .fav-collapse:nth-last-child(4)',
        '.space-dynamic .space-dynamic__right',
        'main.space-main div.space-home div.aside',
        '.fans-medal'
    ]
    const adList = document.querySelectorAll(selector.join(', '));
    adList.forEach(el => {
        el.style.display = 'none';
    });
}

hideAds();

// 播放器容器选择器（B站视频主体容器，按需补充）
const playerSelectors = [
    '#playerWrap',
];

// 监听动态加载内容（防止网页延迟弹出广告）
const observer = new MutationObserver((mutations) => {
    // 遍历所有DOM变更，判断是否来自播放器区域
    for (const mut of mutations) {
        // 标记
        let isPlayerArea = false;
        let target = mut.target;

        // 向上递归查找父级，判断当前变化的 dom 是否在播放器内
        while (target && target !== document.body) {
            // 命中播放器直接跳过
            if (playerSelectors.some(s => target.matches(s))) {
                isPlayerArea = true;
                break;
            }
            // 否则继续找父级
            target = target.parentElement;
        }

        // 非播放器区域的变动，才执行逻辑
        if (!isPlayerArea) {
            hideAds();
            break;
        }
    }
});
observer.observe(document.body, {
    childList: true, subtree: true
});

// ==========================================================================================
// ==========================================================================================
// ========================================== 需要延迟执行的部分

// 添加稍后观看
function addMarkWatchList1() {
    let watchLaterLink = document.querySelector('.nav-bar .nav-bar__main .nav-bar__main-left .nav-tab a:nth-last-of-type(1)');
    if (watchLaterLink) {
        const cloneLink = watchLaterLink.cloneNode(true);
        cloneLink.target = '_blank';
        cloneLink.href = 'https://www.bilibili.com/watchlater/list';
        cloneLink.querySelector('span').innerHTML = '稍后观看';
        cloneLink.querySelector('i').classList.remove('sic-BDC-nut_setting_line')
        cloneLink.querySelector('i').classList.add('sic-BDC-video_archive_line')
        watchLaterLink.before(cloneLink);
    }
}

function addMarkWatchList2() {
    let likeButton = document.querySelector('.right-entry li:nth-of-type(4)');
    if (likeButton) {
        const cloneLink = likeButton.cloneNode(true);
        cloneLink.querySelector('a').href = 'https://www.bilibili.com/watchlater/list';
        cloneLink.querySelector('svg').innerHTML = '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.73252 2.67094C3.33229 2.28484 3.33229 1.64373 3.73252 1.25764C4.11291 0.890684 4.71552 0.890684 5.09591 1.25764L7.21723 3.30403C7.27749 3.36218 7.32869 3.4261 7.37081 3.49407H10.5789C10.6211 3.4261 10.6723 3.36218 10.7325 3.30403L12.8538 1.25764C13.2342 0.890684 13.8368 0.890684 14.2172 1.25764C14.6175 1.64373 14.6175 2.28484 14.2172 2.67094L13.364 3.49407H14C16.2091 3.49407 18 5.28493 18 7.49407V12.9996C18 15.2087 16.2091 16.9996 14 16.9996H4C1.79086 16.9996 0 15.2087 0 12.9996V7.49406C0 5.28492 1.79086 3.49407 4 3.49407H4.58579L3.73252 2.67094ZM4 5.42343C2.89543 5.42343 2 6.31886 2 7.42343V13.0702C2 14.1748 2.89543 15.0702 4 15.0702H14C15.1046 15.0702 16 14.1748 16 13.0702V7.42343C16 6.31886 15.1046 5.42343 14 5.42343H4ZM5 9.31747C5 8.76519 5.44772 8.31747 6 8.31747C6.55228 8.31747 7 8.76519 7 9.31747V10.2115C7 10.7638 6.55228 11.2115 6 11.2115C5.44772 11.2115 5 10.7638 5 10.2115V9.31747ZM12 8.31747C11.4477 8.31747 11 8.76519 11 9.31747V10.2115C11 10.7638 11.4477 11.2115 12 11.2115C12.5523 11.2115 13 10.7638 13 10.2115V9.31747C13 8.76519 12.5523 8.31747 12 8.31747Z" fill="currentColor"></path>';
        cloneLink.querySelector('span').innerHTML = '稍后';
        likeButton.after(cloneLink);
    }
}

setTimeout(() => {
    addMarkWatchList1();
    addMarkWatchList2();
}, 500);
