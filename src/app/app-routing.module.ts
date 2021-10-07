import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppendstudentComponent } from './appendstudent/appendstudent.component';
import { AttendentsComponent } from './attendents/attendents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path:"",
    component:DashboardComponent
  },
  {
    path : "dashboard",
    component :DashboardComponent,
    children:[
      {
        path:"total-students",
        component:ListComponent
      },
      {
        path:"today",
        component:AttendentsComponent
      }
    ]
  },
  {
    path : "list",
    component :ListComponent
  },
  {
    path : "create-student",
    component :AppendstudentComponent
  },
  {
    path : "edit-student/:id", // user-edit/aabbb
    component :EditstudentComponent
  },
  {
    path:"attendence",
    component:AttendentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
