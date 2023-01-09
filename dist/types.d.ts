export declare type MessageType = 'ADD_PAGE' | 'PRINT';
export declare type PrintMessageBody = string;
export declare type MessagesBody = PrintMessageBody;
export declare type Messages<T = MessagesBody> = {
    type: MessageType;
    body: T;
};
export declare type AddPageRes = {
    head: string | String;
    body: string | String;
};
export declare type PrintPageRes = {
    status: boolean;
};
export declare type DResponsesTypes = AddPageRes | PrintPageRes;
export declare type DOMResponse<T = DResponsesTypes> = {
    title: String;
    url: String;
    response: T;
};
