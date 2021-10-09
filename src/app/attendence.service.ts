import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dailyData } from './module1';
@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  constructor(private http:HttpClient) { }
  save(data:dailyData){
    return this.http.post(`https://615e89e13d1491001755a97b.mockapi.io/attendance`,data);
  }

  getAll(){
    return this.http.get<Array<dailyData>>(`https://615e89e13d1491001755a97b.mockapi.io/attendance`)
  }

  updateById(Id:number|undefined,data:dailyData){
     return this.http.put(`https://615e89e13d1491001755a97b.mockapi.io/attendance/${Id}`, data)
  }
}
