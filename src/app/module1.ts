import { simpleData } from "./module2";

export interface dailyData{
    id?:number,
    date:string,
    students:Array<simpleData>
}