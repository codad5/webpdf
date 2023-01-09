import { DOMResponse, DResponsesTypes, MessageType, Messages, MessagesBody, PrintMessageBody, PrintPageRes } from "./types"
let ToBeprintBody = ''
const resolveRes = (type : MessageType, body ?: MessagesBody) : DResponsesTypes|null => {
    switch (type) {
        case 'ADD_PAGE':
            return readyHTML()
        break;
        case 'PRINT':
            return preparePrint(body ?? '')
        break;
        case 'GET_PRINT_DATA':
            console.clear()
            console.log('getting print data')
            return {
                status: true,
                body : ToBeprintBody
            }
        break;
        default:
            return null;
        break;
    }
}
const preparePrint = (body : PrintMessageBody) : PrintPageRes => {
    console.log(body)
    ToBeprintBody = body
    const url = chrome.runtime.getURL("pages/print.html")
    return {
        status: true,
        url: url
    }
}
const readyHTML = () => {
    const body = document.querySelector('html')
    const body_clone = document?.cloneNode(true) as Element
    body_clone?.querySelectorAll('link').forEach(link => {
        console.log(link.href)
        link.href=link.href
    })
    body_clone?.querySelectorAll('a').forEach(link => {
        console.log(link.href)
        link.href=link.href
    })
    body_clone?.querySelectorAll('img').forEach(img => {
        console.log(img.src)
        img.src=img.src
    })
    body_clone?.querySelectorAll('script').forEach(script => {
        console.log(script.src)
        script.src=script.src
    })
    return {
        head : body_clone?.querySelector('head')?.innerHTML ?? '',
        body : body_clone?.querySelector('body')?.innerHTML ?? '',
    }
}
const messageFromListener = (msg : Messages, sender: chrome.runtime.MessageSender, sendResponse : (res : DOMResponse) => void) => {
    const res = resolveRes(msg.type, msg.body)
    if(!res) return;
    console.log('hello')
    sendResponse({
        title: document.title,
        url: document.URL,
        response: res
    })
    
}
chrome.runtime.onMessage.addListener(messageFromListener)