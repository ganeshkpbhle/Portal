import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AttendenceService } from '../attendence.service';
import { DataService } from '../data.service';
import { RouterModule, Routes } from '@angular/router';
import { dailyData } from '../module1';
import { draw, drawArray } from '../module3';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  count1:number=0;
  count2:number=0;
  date=new Date().toISOString();
  dData: Array<dailyData> = [];
  currMonth:string=new Date().toUTCString().slice(8,11);
  drawData: Array<drawArray> = [];
  list: Array<draw> = [];
  view: any = [800, 500];
  viewOption: string = "month";
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Strength';
  timeline: boolean = true;
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
    this.getData();
  }
  getData() {
    this.attendence.getAll().subscribe((fetched) => {
      this.dData = fetched;
      this.Init();
    });
  }
  Init(){
    this.drawData = [];
    this.list = [];
    let c = 0;
      this.dData.forEach((element, index) => {
        if(element.date.slice(5,7)===this.date.slice(5,7)){
          let cnt = 0;
          c += 1;
          element.students.forEach((element1, index1) => {
            if (element1.status) {
              cnt += 1;
            }
          });
          let temp: draw = { "name": (new Date(element.date)).toISOString().slice(8, 10), "value": cnt, };
          this.list.push(temp);
        }
      });
      if (c > 0) {
        this.list.sort(this.custom_sort);
        this.drawData.push({ "name": "StrengthLine", "series": this.list });
      }
      else {
        for (let index = 0; index < this.dData.length; index++) {
          this.list.push({ name: "(" + (new Date(this.date)).toUTCString().slice(8, 11) + ")", value: 0 });
        }
        this.drawData.push({ "name": "StrengthLine", "series": this.list });
      }
  }
  custom_sort(a: draw, b: draw) {
    return Number(a.name.slice(0, 2)) - Number(b.name.slice(0, 2));
  }
}
