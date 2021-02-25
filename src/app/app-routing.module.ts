import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateStudentComponent} from './create-student/create-student.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {path: 'createStudent', component: CreateStudentComponent},
  {path: 'updateStudent/:id', component: CreateStudentComponent},
  {path: 'studentList', component: StudentListComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
