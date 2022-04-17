import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailDetailsComponent } from './email-details/email-details.component';
import { EmailListComponent } from './email-list/email-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: EmailListComponent, data: {state: 'Email List'} },
  { path: 'email-details', component: EmailDetailsComponent, data: {state: 'Email Details'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
