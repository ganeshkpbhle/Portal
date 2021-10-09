import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendenceService } from '../attendence.service';
import { dailyData } from '../module1';
import { simpleData } from '../module2';
@Component({
  selector: 'app-attendents',
  templateUrl: './attendents.component.html',
  styleUrls: ['./attendents.component.css']
})
export class AttendentsComponent implements OnInit {
  currDate: string = new Date().toISOString().slice(0, 10);
  cnt: number = 0;
  date: string = this.currDate;
  update: boolean = true;
  save: boolean = false;
  allPresent:boolean=false;
  studentList: Array<simpleData> = [];
  studentsLi:Array<Data>=[];
  putData: dailyData = { "date":"", "students": [] };
  empty: dailyData = { "date":"", "students": [] };
  Form: FormGroup;
  constructor(private userService: DataService, private dateservice: AttendenceService, private router: Router) {
    this.Form = new FormGroup({
      datepick: new FormControl(),
      statusall:new FormControl()
    });
    this.userService.getAll().subscribe((fetched) => {
      this.studentsLi=fetched;
    });
  }
  ngOnInit(): void {
    this.generateEmpty();
    this.loadData();
  }
  generateEmpty(){
    this.empty={ "date":"", "students": [] };
    this.userService.getAll().subscribe((fetched) => {
      this.studentsLi.forEach((element) => {
        this.empty.students.push({ "studentId": element.id, "studentName": element.Name, "status": false });
      });
    });
  }
  loadData() {
    this.allPresent=false;
    console.log(this.date);
    let index = 0;
    let flg: Boolean = true;
    this.dateservice.getAll().subscribe((data) => {
      for (index = 0; index < data.length; index++) {
        if (data[index].date == this.date) {
          this.putData= data[index];
          this.putData.date=data[index].date;
          this.studentList = data[index].students; flg = false; break;
        }
      }
      if (flg) {
        this.studentList = this.empty.students;
        this.putData = this.empty;
        this.update = true;
        this.save = false;
      }
      else {
        this.update = false;
        this.save = true;
      }
    });

  }
  check(event: any, data: number) {
    this.putData.students[data].status = event.checked;
    this.allPresent=false;
  }
  dateProcess() {
    this.generateEmpty();
    this.loadData();
  }
  commit() {
    this.putData.date=this.date;
    this.dateservice.save(this.putData).subscribe(() => {
      this.loadData();
      this.router.navigate(["/attendence"]);
    });
  }
  execUpdate() {
    console.log(this.putData);
    this.dateservice.updateById(this.putData.id,this.putData).subscribe(()=>{
      this.loadData();
      this.router.navigate(["/attendence"]);
    });
  }
  statsSet(event:any){
    console.log(this.allPresent);
    if(event.checked){
      this.putData.students.forEach((element,index)=>{
        let temp:boolean=this.putData.students[index].status;
        this.putData.students[index].status=true;
      });
    }
    else{
      this.putData.students.forEach((element,index)=>{
        let temp:boolean=this.putData.students[index].status;
        this.putData.students[index].status=!temp;
      });
      this.loadData();
    }
  }
  clear(){
    this.putData.students.forEach((element,index)=>{
      this.putData.students[index].status=false;
      this.studentList[index].status=false;
    });
  }
}
