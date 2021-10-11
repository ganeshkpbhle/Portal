import { Component, NgModule, OnInit } from '@angular/core';
import { AttendenceService } from '../attendence.service';
import { dailyData } from '../module1';
import { draw, drawArray } from '../module3';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  currDate: Date = new Date();
  date1: string = this.currDate.toISOString().slice(0, 10);
  date: string = this.currDate.toISOString().slice(0, 7);
  currMonth: string = this.date1.slice(5, 7);
  currYear: string = this.date1.slice(0, 4);
  currWeek: string = "";
  dData: Array<dailyData> = [];
  drawData: Array<drawArray> = [];
  list: Array<draw> = [];
  view: any = [1000, 500];
  viewOption: string = "month";
  monthArr1: string[] = ["01", "03", "05", "07", "08", "10", "12"];
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
    this.Week(this.date1);
  }

  ngOnInit(): void {
    this.getData();
  }
  Init() {
    this.drawData = [];
    this.list = [];
    let c = 0;
    if (this.viewOption === "month") {
      this.currMonth = this.date.slice(5, 7);
      this.currYear = this.date.slice(0, 4);
      this.dData.forEach((element, index) => {
        if (element.date.indexOf(this.currMonth) != -1 && element.date.indexOf(this.currMonth) != 8 && element.date.indexOf(this.currMonth) > 4 && element.date.indexOf(this.currYear) != -1 && element.date.indexOf(this.currYear) < 4) {
          let cnt = 0;
          c += 1;
          element.students.forEach((element1, index1) => {
            if (element1.status) {
              cnt += 1;
            }
          });
          let temp: draw = { "name": (new Date(element.date)).toISOString().slice(8, 10) + "(" + (new Date(element.date)).toUTCString().slice(0, 3) + ")", "value": cnt, };
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
    else {
      this.xAxisLabel = this.currWeek;
      let n: number = Number(this.date1.slice(8, 10));
      let t: string = (this.date1.slice(5, 7));
      let m: number = 0;
      let temp: string = this.date1.slice(0, 8);
      if (t === "02") {
        m = 28;
      }
      else {
        m = (this.monthArr1.includes(t)) ? 31 : 30;
      }
      let cmp: string = "";
      let tempData: Array<dailyData> = [];
      for (let index = 0; index < 7; index++) {
        cmp = "";
        if ((n + index) % m === 0) {
          cmp = (n + index) <= 9 ? "0" + ((n + index)).toString() : ((n + index)).toString();
          this.dData.filter((entry) => {
            if (entry.date === temp + cmp) {
              tempData.push(entry);
            }
          });
          let num: number = Number(t) + 1;
          if (num <= 12) {
            temp = this.currWeek.slice(0, 5);
            temp += (num < 10) ? "0" + num.toString() : num.toString();
            temp += "-";
          }
        }
        else {
          cmp = ((n + index) % m <= 9) ? "0" + ((n + index) % m).toString() : ((n + index) % m).toString();
          this.dData.filter((entry) => {
            if (entry.date === temp + cmp) {
              tempData.push(entry);
            }
          });
        }
      }
      tempData.forEach((element,index)=>{
        let cnt = 0;
          c += 1;
          element.students.forEach((element1, index1) => {
            if (element1.status) {
              cnt += 1;
            }
          });
          let tempp: draw = { "name": (new Date(element.date)).toISOString().slice(8, 10) + "(" + (new Date(element.date)).toUTCString().slice(0, 3) + ")", "value": cnt, };
          this.list.push(tempp);
      });
      console.log(this.list);
      if (c > 0) {
        //this.list.sort(this.custom_sort);
        this.drawData.push({ "name": "StrengthLine", "series": this.list });
      }
      else {
        for (let index = 0; index < this.dData.length; index++) {
          this.list.push({ name: "(" + (new Date(this.date)).toUTCString().slice(8, 11) + ")", value: 0 });
        }
        this.drawData.push({ "name": "StrengthLine", "series": this.list });
      }
    }
  }
  custom_sort(a: draw, b: draw) {
    return Number(a.name.slice(0, 2)) - Number(b.name.slice(0, 2));
  }
  getData() {
    this.service.getAll().subscribe((fetched) => {
      this.dData = fetched;
      this.Init();
    });
  }
  Week(d: string) {
    let today: Date = new Date(d);
    let jan: Date = new Date(today.getFullYear(), 0, 1);
    let numberofdays = Math.floor((today.getTime() - jan.getTime()) / (24 * 60 * 60 * 1000));
    this.currWeek = this.currYear + "-W" + Math.ceil((today.getDay() + 1 + numberofdays) / 7).toString();
    console.log("CurrentWeek:" + this.currWeek);
  }
  weekProcess() {
    this.date1 = this.getDateByWeek(this.currWeek).toISOString().slice(0, 10);
    this.Init();
  }
  dateProcess() {
    console.log(this.date);
    if (this.date.slice(5, 7) !== this.currMonth) {
      this.getData();
    }

  }
  selectProcess(event: any) {
    this.viewOption = event.value;
    this.Week(this.currDate.toISOString());
    this.date1 = this.getDateByWeek(this.currDate.toISOString()).toISOString().slice(0, 10);
    this.Init();
  }

  getDateByWeek(Week: string) {
    let d = new Date(Number(Week.slice(0, 4)), 0, 1);
    let dayNum = d.getDay();
    let requiredDate: number = (Number.parseInt(Week.slice(6, 8)) - 1) * 7;
    requiredDate += 1;
    if (((dayNum != 0) || dayNum > 4)) {
      requiredDate += 8;
    }
    d.setDate(1 - d.getDay() + requiredDate);
    // this.date1=d.toISOString().slice(0,10);
    return d;
  }

}
