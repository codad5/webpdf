import { DOMResponse, DResponsesTypes, MessageType, Messages, MessagesBody } from "./types"
const resolveRes = (type : MessageType, body ?: MessagesBody) : DResponsesTypes|null => {
    switch (type) {
        case MessageType.ADD_PAGE:
            return readyHTML()
        break;
        default:
            return null;
        break;
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

/**
 * #udemy > div.ud-main-content-wrapper > div.ud-main-content > div > div > div:nth-child(2) > div.heading > div.ud-container.lead-container > div:nth-child(2) > div > div > div > div > div.buy-button.buy-box--buy-box-item--2RETv.buy-box--buy-button--35r28 > div > button
 */