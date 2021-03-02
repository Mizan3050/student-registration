import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStudentComponent} from './create-student/create-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import {LoginComponent} from './login/login.component';
import { AuthGaurd } from './services/auth-gaurd.service';

const routes: Routes = [
  {path: '', canActivate:[AuthGaurd], component: CreateStudentComponent},
  {path: 'updateStudent/:id', canActivate:[AuthGaurd], component: CreateStudentComponent},
  {path: 'studentList', canActivate:[AuthGaurd], component: StudentListComponent},
  {path: 'studentList/:id', component: StudentDetailComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
