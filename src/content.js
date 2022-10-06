// import './css/content.css';
console.clear();

/***
 * 说明，此时的全局执行上下文与浏览器的执行上下文不一致，此时绑定的全局请求代理，并没有添加到
 * 浏览器的window对象上不会生效。。。。
 */

let script = document.createElement('script');
script.src = 'https://unpkg.com/ajax-hook@2.0.3/dist/ajaxhook.min.js';
document.body.appendChild(script);
console.clear();

script.onload = function () {
    let js = document.createElement('script');
    js.className = 'logic';
    js.innerHTML = `
    var ah = window.ah;
    if (ah) {
        ah.proxy({
            onResponse: (response, handler) => {
                console.log(response);
                handler.next(response);
            }
        });
    }
    let video = document.querySelector('video')
    console.log(video, 'video')
    if (video) {
        console.log(video.src)
    }
//     const u = window.URL.createObjectURL
// window.URL.createObjectURL = (url) => {
//     console.log(url)
//     return u.call(window.URL, url)
// }
    `;
    // document.body.appendChild(js);
    const first = document.head.firstElementChild
    document.head.insertBefore(js, first)
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.value) {
        console.log(request);
        // console.log(sender);
        // 发送的信息似乎可以直接发送对象
        sendResponse('content-script已经接收到你的消息');
        if (request.cmd === 'reload-page') {
            // 先把操作存起来,此时插件会刷新
            // localStorage.setItem('refresh', true);
            // 不需要保存起来，延时刷新即可
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }
});

const one = {
    color: '#fff',
    background: 'aqua',
    padding: '5px 10px',
    'border-left-top-radius': '3px',
    'border-left-bottom-radius': '3px'
};
const two = {
    color: '#fff',
    background: '#6cf',
    padding: '5px 10px',
    'border-right-top-radius': '3px',
    'border-right-bottom-radius': '3px'
};

console.log(
    '%c link %c start ',
    Object.entries(one)
        .map(attr => {
            return attr[0] + ':' + attr[1];
        })
        .join(';'),
    Object.entries(two)
        .map(attr => {
            return attr[0] + ':' + attr[1];
        })
        .join(';')
);
console.log('(￢_￢)');
