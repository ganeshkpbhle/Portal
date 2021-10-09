import { Component, NgModule, OnInit } from '@angular/core';
import { AttendenceService } from '../attendence.service';
import { dailyData } from '../module1';
import { draw, drawArray } from '../module3';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  date: string = new Date().toISOString().slice(0, 7);
  currMonth: string = this.date.slice(5, 7);
  currYear:string=this.date.slice(0,4);
  dData: Array<dailyData> = [];
  drawData: Array<drawArray> = [];
  list: Array<draw> = [];
  view: any = [1000, 500];

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
  constructor(private service: AttendenceService) {

  }

  ngOnInit(): void {
    this.getData();
  }
  Init() {
    this.drawData = [];
    this.list=[];
    let c=0;
    this.currMonth = this.date.slice(5, 7);
    this.currYear=this.date.slice(0,4);
    console.log(this.currMonth);
    this.dData.forEach((element, index) => {
      if (element.date.indexOf(this.currMonth) != -1 && element.date.indexOf(this.currMonth) != 8 && element.date.indexOf(this.currMonth)>4&& element.date.indexOf(this.currYear)!=-1 && element.date.indexOf(this.currYear)<4) {
        let cnt = 0;
        c+=1;
        element.students.forEach((element1, index1) => {
          if (element1.status) {
            cnt += 1;
          }
        });
        let temp: draw = { "name": (new Date(element.date)).toISOString().slice(8, 10) + "(" + (new Date(element.date)).toUTCString().slice(0, 3) + ")", "value": cnt, };
        this.list.push(temp);
        this.list.sort(this.custom_sort);
      }
    });
    if(c>0){
    this.drawData.push({ "name": "StrengthLine", "series": this.list, });
    }
    else{
      for (let index = 0; index < this.dData.length; index++) {
        this.list.push({name:"(" + (new Date(this.date)).toUTCString().slice(8,11)+ ")",value:0});
      }
      this.drawData.push({"name":"StrengthLine","series":this.list});
    }

  }
  custom_sort(a: draw, b: draw) {
    return Number(a.name.slice(0,2))-Number(b.name.slice(0,2));
  }
  getData(){
    this.service.getAll().subscribe((fetched) => {
      this.dData = fetched;
      this.Init();
    });
  }

  dateProcess() {
    if (this.date.slice(5, 7) !== this.currMonth) {
      this.getData();
    }
  }
}
