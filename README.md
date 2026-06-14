# 哔哩哔哩广告隐藏插件

```javascript
// 隐藏广告
function hideAds() {
    let selector = [
        '.video-card-ad-small',
        '#slide_ad',
        '.ad-report',
        '.ad-floor-exp',
        '.left-entry .v-popover-wrap:nth-last-child(-n+2)',
        '.favlist-aside .vui_collapse .fav-collapse:nth-last-child(1)',
    ]
    const adList = document.querySelectorAll(selector.join(', '));
    adList.forEach(el => {
        el.style.display = 'none';
    });
}

// 日志逻辑
function log() {
    console.info("%c 🎬 哔哩哔哩隐藏广告插件执行一次 %c by 王香龙 ", "padding: 2px 6px; border-radius: 3px 0 0 3px; color: #FFFFFF; background: #FF6699; font-weight: bold;", "padding: 2px 6px; border-radius: 0 3px 3px 0; color: #FFFFFF; background: #FF9999; font-weight: bold;");
}

// 统一执行
function runAll() {
    hideAds();
    log();
}

// 初始执行
runAll();

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
            runAll();
            break;
        }
    }
});
observer.observe(document.body, {
    childList: true, subtree: true
});
```

