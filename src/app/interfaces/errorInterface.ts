import { IconBaseProps, IconContext, IconType } from "react-icons";

export interface errorReturn {
    status:number,
    error:Record<string,string>
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: errorReturn };


export interface SetErrorInterface{
    icon:IconType,
    title:string,
    description:string,
    actionText:string,
    actionLink:string
}

