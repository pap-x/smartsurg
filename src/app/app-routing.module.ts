import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { EditComponent } from './edit/edit.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'edit', component: EditComponent },
  { path: 'verify', component: VerifyComponent },
  { path: '', component: StartComponent}
  //{ path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
