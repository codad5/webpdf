import { AddPageRes, DOMResponse, MessageType, Messages, PrintMessageBody, PrintPageRes } from "./types.js";

const addPageButton : HTMLButtonElement|null = document.querySelector('button#add-page-btn')
const PrintButton : HTMLButtonElement|null = document.querySelector('button#print-btn')
const screensizeButton : HTMLSelectElement|null = document.querySelector('select#screen_size')
const MyIframe : HTMLIFrameElement|null  = document.querySelector('iframe#main')


const loadData = (data: AddPageRes) => {
     MyIframe?.contentDocument?.body.insertAdjacentHTML('beforeend', data.body as string)
     MyIframe?.contentDocument?.head.insertAdjacentHTML('beforeend', data.head as string)
}

const saveContent = (tab_id : string|number, data : AddPageRes) => {
    const newData = {data:[...JSON.parse(localStorage.getItem(`tab_${tab_id}`) ?? '{}').data ?? [], data]}
    console.log(newData)
    localStorage.setItem(`tab_${tab_id}`, JSON.stringify(newData))
}

//  Event Listeners
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

//  Event Listeners
addPageButton?.addEventListener('click', () => {
    console.log('working 1')
    chrome.tabs && chrome.tabs.query({
            active:true,
            currentWindow:true
        }, tabs => {
            console.log(tabs[0].id)
            chrome.tabs.sendMessage(
                tabs[0].id || 0,
                { type: MessageType.ADD_PAGE } ,
                (res : DOMResponse<AddPageRes>) => {
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
// For media query
screensizeButton?.addEventListener('change', () => {
    MyIframe?.setAttribute('width' , `${screensizeButton.value}px`)
    document.body.style.width = `${(+screensizeButton.value) + 20}px`
    document.body.style.aspectRatio = '3/1'
    // document.body.style.height = `80vh`
    console.log('change')
})

/**
*  How the print works 
*  for the selected tab once the print button is pressed the tab id is saved to local storage 
*  Then a new tab is created with pages/print.html as the page
*  The print page will then get all the pages data from the localstorage and the fix it into the iframe in the print page 
*  Then the page will automatically start printing the iframe content in the seleced media query
*/
PrintButton?.addEventListener('click',  () => {
    chrome.tabs && chrome.tabs.query({
            active:true,
            currentWindow:true
        }, tabs => {
        // store the tab id in localstorage
        localStorage.setItem(`print_tab`, `${tabs[0].id || 0}`)
        //store the width in localstorage
        localStorage.setItem(`print_width`, `${screensizeButton?.value ?? 480}px`)
        chrome.tabs?.create({ url: chrome.runtime.getURL("pages/print.html") } , (newTab) => {
        console.log(newTab)
        chrome.tabs.sendMessage(
            newTab['id'] ?? 0,
            {
                type: MessageType.PRINT,
                body: MyIframe?.contentDocument?.querySelector('html')?.innerHTML
            } as Messages<PrintMessageBody>,
            (res : DOMResponse<PrintPageRes>) => {
                console.log(res)
                res?.response.status ? alert("printing") : null
            }
            )
        })
    })
})