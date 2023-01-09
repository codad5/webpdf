const addPageButton = document.querySelector('button#add-page-btn');
const PrintButton = document.querySelector('button#print-btn');
const screensizeButton = document.querySelector('select#screen_size');
const MyIframe = document.querySelector('iframe#main');
window.addEventListener('load', () => {
    chrome.tabs && chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        var _a, _b, _c;
        console.log(localStorage.getItem(`tab_${tabs[0].id || 0}`), `tab_${tabs[0].id || 0}`);
        const data = (_c = (_b = JSON.parse((_a = localStorage.getItem(`tab_${tabs[0].id || 0}`)) !== null && _a !== void 0 ? _a : '{}')) === null || _b === void 0 ? void 0 : _b.data) !== null && _c !== void 0 ? _c : [];
        data.forEach(pages => {
            loadData(pages);
        });
    });
});
// 314126364, 314126364, 314126364
addPageButton === null || addPageButton === void 0 ? void 0 : addPageButton.addEventListener('click', () => {
    console.log('working 1');
    chrome.tabs && chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        console.log(tabs[0].id);
        chrome.tabs.sendMessage(tabs[0].id || 0, { type: "ADD_PAGE" }, (res) => {
            var _a, _b, _c, _d;
            console.log(res);
            // if(res.response instanceof String){
            //     res.response = new DOMParser().parseFromString(res.response as string, 'text/html')
            // }
            loadData(res.response);
            saveContent(tabs[0].id || 0, {
                head: (_b = (_a = MyIframe === null || MyIframe === void 0 ? void 0 : MyIframe.contentDocument) === null || _a === void 0 ? void 0 : _a.head.innerHTML) !== null && _b !== void 0 ? _b : '',
                body: (_d = (_c = MyIframe === null || MyIframe === void 0 ? void 0 : MyIframe.contentDocument) === null || _c === void 0 ? void 0 : _c.body.innerHTML) !== null && _d !== void 0 ? _d : ''
            });
        });
    });
});
const loadData = (data) => {
    var _a, _b;
    (_a = MyIframe === null || MyIframe === void 0 ? void 0 : MyIframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body.insertAdjacentHTML('beforeend', data.body);
    (_b = MyIframe === null || MyIframe === void 0 ? void 0 : MyIframe.contentDocument) === null || _b === void 0 ? void 0 : _b.head.insertAdjacentHTML('beforeend', data.head);
};
const saveContent = (tab_id, data) => {
    var _a, _b;
    const newData = { data: [...(_b = JSON.parse((_a = localStorage.getItem(`tab_${tab_id}`)) !== null && _a !== void 0 ? _a : '{}').data) !== null && _b !== void 0 ? _b : [], data] };
    console.log(newData);
    localStorage.setItem(`tab_${tab_id}`, JSON.stringify(newData));
};
screensizeButton === null || screensizeButton === void 0 ? void 0 : screensizeButton.addEventListener('change', () => {
    MyIframe === null || MyIframe === void 0 ? void 0 : MyIframe.setAttribute('width', `${screensizeButton.value}px`);
    document.body.style.width = `${(+screensizeButton.value) + 20}px`;
    document.body.style.aspectRatio = '3/1';
    // document.body.style.height = `80vh`
    console.log('change');
});
PrintButton === null || PrintButton === void 0 ? void 0 : PrintButton.addEventListener('click', () => {
    print();
    chrome.tabs && chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => {
        var _a;
        chrome.tabs.sendMessage(tabs[0].id || 0, { type: "PRINT", body: (_a = document === null || document === void 0 ? void 0 : document.querySelector("html")) === null || _a === void 0 ? void 0 : _a.innerHTML }, (res) => {
            console.log(res);
            // if(res.response instanceof String){
            //     res.response = new DOMParser().parseFromString(res.response as string, 'text/html')
            // }
            (res === null || res === void 0 ? void 0 : res.response.status) ? alert("printed") : null;
        });
    });
});
export {};
//# sourceMappingURL=index.js.map