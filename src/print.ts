import { AddPageRes, DOMResponse, GetPrintDataRes, Messages } from "./types";

const formatDataIntoPage = (data: string) => {
    // document.
    console.log(data)
}

(function(){
    const data =  "Hello"
})();


window.addEventListener('load', () => {
            const tab_id = localStorage.getItem('print_tab');
            // console.log(localStorage.getItem(`tab_${tabs[0].id || 0}`), `tab_${tabs[0].id || 0}`)
            const data : AddPageRes[] = JSON.parse(localStorage.getItem(`tab_${tab_id || 0}`) ?? '{}')?.data ?? []
            data.forEach(pages => {
                loadData(pages)
            })
            window.frames[0].focus()
            window.frames[0].print()
})
// 314126364, 314126364, 314126364

const loadData = (data: AddPageRes) => {
    const width = localStorage.getItem('print_width') ?? '100vw'
    const MyIframe : HTMLIFrameElement|null  = document.querySelector('iframe#main')
    MyIframe?.setAttribute('width' , width)
    MyIframe?.contentDocument?.body.insertAdjacentHTML('beforeend', data.body as string)
    MyIframe?.contentDocument?.head.insertAdjacentHTML('beforeend', data.head as string)
}