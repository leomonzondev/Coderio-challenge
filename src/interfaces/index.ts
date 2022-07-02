export interface Entry {
    datetime: string;
    timezone: string;
}

export interface Call {
    timezone: string;
    datetime: string;
    _v?: string;
    _id?:Object;
}