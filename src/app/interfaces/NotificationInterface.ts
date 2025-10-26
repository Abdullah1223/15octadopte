import { Dispatch, SetStateAction } from "react"

export interface getNotificationsProps{
    cursor:string,
    prevDocs:string[],
    setAllNotifications:Dispatch<SetStateAction<any[]>>,
    setHasMore:Dispatch<SetStateAction<boolean>>,
    setCursor:Dispatch<SetStateAction<string>>,
    setPrevDocs:Dispatch<SetStateAction<any[]>>
}
export interface UseNotificaitonInterface{
    getNotifications({cursor,prevDocs}:getNotificationsProps)
}