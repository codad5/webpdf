const resolveRes = (type, body) => {
    switch (type) {
        case 'ADD_PAGE':
            return readyHTML();
            break;
        case 'PRINT':
            return preparePrint(body !== null && body !== void 0 ? body : '');
            break;
        default:
            return null;
            break;
    }
};
const preparePrint = (body) => {
    var _a, _b;
    const html = document.querySelector('html');
    const fakeHTML = new DOMParser().parseFromString(body, 'text/html');
    const MyIframe = fakeHTML.querySelector('iframe#main');
    (_a = MyIframe === null || MyIframe === void 0 ? void 0 : MyIframe.contentWindow) === null || _a === void 0 ? void 0 : _a.focus();
    (_b = MyIframe === null || MyIframe === void 0 ? void 0 : MyIframe.contentWindow) === null || _b === void 0 ? void 0 : _b.print();
    console.log(MyIframe, fakeHTML);
    // html?.replaceWith(MyIframe?.querySelector('html') ?? '')
    // html?.focus()
    // window.focus()
    // window.print()
    // window.location.reload()
    return {
        status: true
    };
};
const readyHTML = () => {
    var _a, _b, _c, _d;
    const body = document.querySelector('html');
    const body_clone = document === null || document === void 0 ? void 0 : document.cloneNode(true);
    body_clone === null || body_clone === void 0 ? void 0 : body_clone.querySelectorAll('link').forEach(link => {
        console.log(link.href);
        link.href = link.href;
    });
    body_clone === null || body_clone === void 0 ? void 0 : body_clone.querySelectorAll('a').forEach(link => {
        console.log(link.href);
        link.href = link.href;
    });
    body_clone === null || body_clone === void 0 ? void 0 : body_clone.querySelectorAll('img').forEach(img => {
        console.log(img.src);
        img.src = img.src;
    });
    body_clone === null || body_clone === void 0 ? void 0 : body_clone.querySelectorAll('script').forEach(script => {
        console.log(script.src);
        script.src = script.src;
    });
    return {
        head: (_b = (_a = body_clone === null || body_clone === void 0 ? void 0 : body_clone.querySelector('head')) === null || _a === void 0 ? void 0 : _a.innerHTML) !== null && _b !== void 0 ? _b : '',
        body: (_d = (_c = body_clone === null || body_clone === void 0 ? void 0 : body_clone.querySelector('body')) === null || _c === void 0 ? void 0 : _c.innerHTML) !== null && _d !== void 0 ? _d : '',
    };
};
const messageFromListener = (msg, sender, sendResponse) => {
    const res = resolveRes(msg.type, msg.body);
    if (!res)
        return;
    console.log('hello');
    sendResponse({
        title: document.title,
        url: document.URL,
        response: res
    });
};
chrome.runtime.onMessage.addListener(messageFromListener);
export {};
//# sourceMappingURL=content.js.map