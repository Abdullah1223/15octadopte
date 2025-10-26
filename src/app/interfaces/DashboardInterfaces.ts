import { Dispatch, SetStateAction } from "react"

export interface useDashboardInterface{
  
    getDashboardStats(props:getDashboardProps):Promise<void>
}

export interface getDashboardProps{
    updateData(type,value):Dispatch<SetStateAction<any>>
}