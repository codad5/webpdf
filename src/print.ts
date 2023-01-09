import { DOMResponse, GetPrintDataRes, Messages } from "./types";

const formatDataIntoPage = (data: string) => {
    // document.
    console.log(data)
}
chrome.runtime.sendMessage({type : 'GET_PRINT_DATA'} as Messages , function(res : DOMResponse<GetPrintDataRes>){
console.log(res)
  formatDataIntoPage(res?.response?.body as string);
  window.print();
});