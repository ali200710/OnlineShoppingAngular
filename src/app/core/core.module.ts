import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    ForbiddenComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    CoreRoutingModule
  ],
  exports: [
    HeaderComponent
  ]

})
export class CoreModule { }
