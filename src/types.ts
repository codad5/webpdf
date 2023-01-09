export type MessageType = 'ADD_PAGE' | 'PRINT' | 'GET_PRINT_DATA'
export type PrintMessageBody = string
export type MessagesBody = PrintMessageBody
export type Messages<T = MessagesBody> = {
    type : MessageType,
    body : T
}
export type AddPageRes = {
    head:string|String,
    body:string|String,
}
export type PrintPageRes = {
    status:boolean,
    url :string
}
export type GetPrintDataRes = {
    status:boolean,
    body:string|String
}
export type DResponsesTypes = AddPageRes | PrintPageRes | GetPrintDataRes
export type DOMResponse<T = DResponsesTypes> = {
    title : String,
    url : String,
    response : T
}