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
function addMarkWatchList() {
    let watchLaterLink = document.querySelector('.nav-bar .nav-bar__main .nav-bar__main-left .nav-tab a:nth-last-of-type(1)');
    const cloneLink = watchLaterLink.cloneNode(true);
    {
        cloneLink.target = '_blank';
        cloneLink.href = 'https://www.bilibili.com/watchlater/list';
        cloneLink.querySelector('span').innerHTML = '稍后观看';
        cloneLink.querySelector('i').classList.remove('sic-BDC-nut_setting_line')
        cloneLink.querySelector('i').classList.add('sic-BDC-video_archive_line')
    }
    watchLaterLink.before(cloneLink);
}

setTimeout(() => {
    addMarkWatchList();
}, 500);
