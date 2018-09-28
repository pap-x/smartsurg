import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { EditComponent } from './edit/edit.component';
import { AppRoutingModule } from './/app-routing.module';
import { StartComponent } from './start/start.component';
import { ProcedureService } from './procedure.service';
import { AddSpaces } from './capital-space.pipe';
import { AddSpacesArray } from './capital-space-array.pipe';
import { FilterUnique } from './filter-unique.pipe';
import { LimitChar } from './limit-char.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    VerifyComponent,
    EditComponent,
    StartComponent,
    AddSpaces,
    AddSpacesArray,
    FilterUnique,
    LimitChar
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ProcedureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
