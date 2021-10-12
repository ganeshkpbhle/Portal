import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { }
  save(student:Data){
    return this.http.post(`https://615e89e13d1491001755a97b.mockapi.io/users`,student);
  }

  getAll(){
    return this.http.get<Array<Data>>(`https://615e89e13d1491001755a97b.mockapi.io/users`);
  }

  getByID(id:number){
    return this.http.get<Data>(`https://615e89e13d1491001755a97b.mockapi.io/users/${id}`);
  }

  updateById(studentId:number,studentdata:Data){
    return this.http.put(`https://615e89e13d1491001755a97b.mockapi.io/users/${studentId}`,studentdata);
  }

  deleteById(id:number){
    return this.http.delete(`https://615e89e13d1491001755a97b.mockapi.io/users/${id}`)
  }
}

