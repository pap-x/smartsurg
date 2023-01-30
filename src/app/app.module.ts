import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of, Observable, ObservableInput } from 'rxjs';

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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';
import { ReviewComponent } from './review/review.component';

//Load values from external json file
function load(http: HttpClient, config: ProcedureService): (() => Promise<boolean>) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
       http.get('./config.json')
         .pipe(
           map((x: ProcedureService) => {
             config.server_ip = x.server_ip+"/SMARTsurgProtocolServer/protocol/";
             resolve(true);
           }),
           catchError((x: { status: number }, caught: Observable<void>): ObservableInput<{}> => {
             if (x.status !== 404) {
               resolve(false);
             }
             console.log(x);
             config.server_ip = 'http://localhost:8080/SMARTsurgProtocolServer/protocol/';
             resolve(true);
             return of({});
           })
         ).subscribe();
    });
  };
}

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
    LimitChar,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  providers: [
    ProcedureService,
    {provide: APP_INITIALIZER,
    useFactory: load,
    deps: [
      HttpClient,
      ProcedureService
    ],
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
