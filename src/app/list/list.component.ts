import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  studentList:Array<Data>=[];
  constructor(private userService:DataService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.userService.getAll().subscribe((data) => {
      console.log(data.length);
      this.studentList = data
     })
  }

  deleteData(id:number){
    this.userService.deleteById(id).subscribe((data) => {
      this.loadData()
    })
  }
}
