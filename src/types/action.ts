type Action = {
    type: string;
    payload?: Payload;
};

type Payload = {
    params?: any;
    callback?: (data?: any) => any;
    response?: any;
    pagination?: any;
};
export type { Action, Payload };
; 