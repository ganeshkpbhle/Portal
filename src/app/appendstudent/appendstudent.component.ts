import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Data } from '@angular/router';
@Component({
  selector: 'app-appendstudent',
  templateUrl: './appendstudent.component.html',
  styleUrls: ['./appendstudent.component.css']
})
export class AppendstudentComponent implements OnInit {
  dataArr:Array<Data>=[
  ];
  Form:FormGroup
  constructor(private userService:DataService,private router:Router) {
    this.Form = new FormGroup({
      'Name': new FormControl('', Validators.required),
      'Email': new FormControl('', [Validators.required, Validators.email]),
      'phoneNumber': new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'country': new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
  }
  submit(){
    Object.keys(this.Form.controls).forEach(field => {
      const control = this.Form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.Form.valid){
      console.log("FromForm:");
      console.log(this.Form.value);
      this.userService.save(this.Form.value).subscribe(() => {
        this.router.navigate(['/list'])
      },() => {
        alert("Something Went Wrong")
      })
      
    }
  }

}
