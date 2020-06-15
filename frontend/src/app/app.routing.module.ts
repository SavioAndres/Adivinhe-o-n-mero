import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateaccountComponent } from './pages/createaccount/createaccount.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ConfigComponent } from './pages/config/config.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    component: RankingComponent
  },
  { 
    path: 'play',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'config',
    component: ConfigComponent,
    canActivate: [AuthGuard]
  },
  { path: 'createaccount', component: CreateaccountComponent },
  { path: 'login', component: LoginComponent },
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }