import { AddPageRes, DOMResponse, Messages, PrintMessageBody, PrintPageRes } from "./types";

const addPageButton : HTMLButtonElement|null = document.querySelector('button#add-page-btn')
const PrintButton : HTMLButtonElement|null = document.querySelector('button#print-btn')
const screensizeButton : HTMLSelectElement|null = document.querySelector('select#screen_size')
const MyIframe : HTMLIFrameElement|null  = document.querySelector('iframe#main')

window.addEventListener('load', () => {
    chrome.tabs && chrome.tabs.query({
            active:true,
            currentWindow:true
        }, tabs => {
            console.log(localStorage.getItem(`tab_${tabs[0].id || 0}`), `tab_${tabs[0].id || 0}`)
            const data : AddPageRes[] = JSON.parse(localStorage.getItem(`tab_${tabs[0].id || 0}`) ?? '{}')?.data ?? []
            data.forEach(pages => {
                loadData(pages)
            })
        })
})
// 314126364, 314126364, 314126364
addPageButton?.addEventListener('click', () => {
    console.log('working 1')
    chrome.tabs && chrome.tabs.query({
            active:true,
            currentWindow:true
        }, tabs => {
            console.log(tabs[0].id)
            chrome.tabs.sendMessage(
                tabs[0].id || 0,
                {type: "ADD_PAGE"} as Messages<undefined>,
                (res : DOMResponse<AddPageRes>) => {
                    console.log(res);
                    // if(res.response instanceof String){
                    //     res.response = new DOMParser().parseFromString(res.response as string, 'text/html')
                    // }
                   loadData(res.response)
                   saveContent(tabs[0].id || 0, {
                    head:MyIframe?.contentDocument?.head.innerHTML ?? '',
                    body:MyIframe?.contentDocument?.body.innerHTML ?? ''
                   })
                }
            )
        }
    )
})

const loadData = (data: AddPageRes) => {
     MyIframe?.contentDocument?.body.insertAdjacentHTML('beforeend', data.body as string)
     MyIframe?.contentDocument?.head.insertAdjacentHTML('beforeend', data.head as string)
}
const saveContent = (tab_id : string|number, data : AddPageRes) => {
    const newData = {data:[...JSON.parse(localStorage.getItem(`tab_${tab_id}`) ?? '{}').data ?? [], data]}
    console.log(newData)
    localStorage.setItem(`tab_${tab_id}`, JSON.stringify(newData))
}

screensizeButton?.addEventListener('change', () => {
    MyIframe?.setAttribute('width' , `${screensizeButton.value}px`)
    document.body.style.width = `${(+screensizeButton.value) + 20}px`
    document.body.style.aspectRatio = '3/1'
    // document.body.style.height = `80vh`
    console.log('change')
})

PrintButton?.addEventListener('click', () => {
    print()
    chrome.tabs && chrome.tabs.query({
            active:true,
            currentWindow:true
        }, tabs => {
            chrome.tabs.sendMessage(
                tabs[0].id || 0,
                {type: "PRINT", body:document?.querySelector("html")?.innerHTML} as Messages<PrintMessageBody>,
                (res : DOMResponse<PrintPageRes>) => {
                    console.log(res);
                    // if(res.response instanceof String){
                    //     res.response = new DOMParser().parseFromString(res.response as string, 'text/html')
                    // }
                   res?.response.status ? alert("printed") : null
                }
            )
        })
})