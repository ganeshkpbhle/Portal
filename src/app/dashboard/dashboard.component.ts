import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AttendenceService } from '../attendence.service';
import { DataService } from '../data.service';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  count1:number=0;
  count2:number=0;
  curr:string=new Date().toISOString().slice(0,10);
  constructor(private dataservice:DataService,private attendence:AttendenceService,private router:Router) { 
    dataservice.getAll().subscribe((data)=>{
      this.count1=data.length;
    });
    let cnt:number=0;
    attendence.getAll().subscribe((data)=>{
      let index=0;
      for (index = 0; index < data.length; index++) {
        if(data[index].date===this.curr){
          break;
        }
      }
      data[index].students.forEach((element)=>{
        if(element.status){
          this.count2+=1;
        }
      });
    });
  }
  event(title:string){
    if(title==="total-students"){
      this.router.navigate(["/total-students"]);
    }
    else{
      this.router.navigate(["/today"]);
    }
  }
  ngOnInit(): void {
  }
}
