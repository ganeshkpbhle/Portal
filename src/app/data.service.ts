import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http:HttpClient) { }
  save(student:Data){
    return this.http.post(`https://5cdd0a92b22718001417c19d.mockapi.io/api/users`,student);
  }

  getAll(){
    return this.http.get<Array<Data>>(`https://5cdd0a92b22718001417c19d.mockapi.io/api/users`);
  }

  getByID(id:number){
    return this.http.get<Data>(`https://5cdd0a92b22718001417c19d.mockapi.io/api/users/${id}`);
  }

  updateById(studentId:number,studentdata:Data){
    return this.http.put(`https://5cdd0a92b22718001417c19d.mockapi.io/api/users/${studentId}`,studentdata);
  }

  deleteById(id:number){
    return this.http.delete(`https://5cdd0a92b22718001417c19d.mockapi.io/api/users/${id}`)
  }
}
