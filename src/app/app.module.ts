import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateStudentComponent } from './create-student/create-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { HttpClientModule } from '@angular/common/http';
import { IsUndefinedPipe } from "./checknull.pipe";
import { StudentDetailComponent } from './student-detail/student-detail.component';
<<<<<<< Updated upstream
=======
import { LoginComponent } from './login/login.component';
import { AuthGaurd } from './services/auth-gaurd.service';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontSize, FONT_SIZE } from './models/demoInterface';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    CreateStudentComponent,
    StudentListComponent,
    IsUndefinedPipe,
    StudentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
<<<<<<< Updated upstream
  providers: [],
=======
  providers: [AuthGaurd, AuthService, {provide: FONT_SIZE, useValue: fontSize }],
>>>>>>> Stashed changes
  bootstrap: [AppComponent]
})
export class AppModule { }
