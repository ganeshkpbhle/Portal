import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {

  id: number = 0;
  Form: FormGroup;
  displayAnimation:boolean = false;
  constructor(private activeRoute: ActivatedRoute,private router:Router,private Service:DataService) {
    // this.id = this.activeRoute.snapshot.params.id;

    this.Form = new FormGroup({
      'Name': new FormControl('', Validators.required),
      'Email': new FormControl('', [Validators.required, Validators.email]),
      'phoneNumber': new FormControl('', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'country': new FormControl('', Validators.required)
    })

  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((paramsData:Data) => {
      this.id = paramsData.id;
      this.Service.getByID(paramsData.id).subscribe((data:Data) => {
        delete data.id
        this.Form.patchValue(data)
      })
    })
  }

  submit() {

    Object.keys(this.Form.controls).forEach(field => {
      const control = this.Form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      }
    });

    if(this.Form.valid){
      // console.log(this.userForm.value)
      this.Service.updateById(this.id,this.Form.value).subscribe((data) => {
        this.router.navigate(["list"])
      })
    }

    // this.displayAnimation = true
    
    

  }

}
