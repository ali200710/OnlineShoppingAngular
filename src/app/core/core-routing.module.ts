import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },

    ]
  },

  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: '/notfound' },
  { path: 'notfound', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
