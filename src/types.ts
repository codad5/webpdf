export type MessageType = 'ADD_PAGE' | 'PRINT'
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
    status:boolean
}
export type DResponsesTypes = AddPageRes | PrintPageRes
export type DOMResponse<T = DResponsesTypes> = {
    title : String,
    url : String,
    response : T
}