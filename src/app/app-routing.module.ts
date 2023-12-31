import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';
import {PmComponent} from './pm/pm.component';
import {AdminComponent} from './admin/admin.component';
import {PeopleModule} from './people/people.module';
import {PeopleManagementComponent} from './people/people-management.component';
import {CreditsSummaryComponent} from "./credits/credits-summary/credits-summary.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'pm',
    component: PmComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'credits-summary',
    component: CreditsSummaryComponent
  },
  {
    path: 'accounts',
    // canActivate: [ProtectedGuard],
    // loadChildren: './people/people.module#PeopleModule'
    component: PeopleManagementComponent
    // loadChildren: () => import('./people/people.module').then(mod => mod.PeopleModule)
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },


  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

