import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from './../components/login/login.component';
import { RegisterComponent } from './../components/register/register.component';

//guards
import { AdminGuard } from '../guards/admin.guard';
import { ClientGuard } from '../guards/client.guard';
import { PageNotFoundComponent } from './../components/page-not-found/page-not-found.component';
import { PurchaseStatusComponent } from '../components/purchase-status/purchase-status.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home", component: HomeComponent, children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "purchase-status", component: PurchaseStatusComponent }
    ]
  },
  { path: "admin", canActivate: [AdminGuard], loadChildren: "./admin.module#AdminModule" },
  { path: "client", canActivate: [ClientGuard], loadChildren: "./client.module#ClientModule" },
  { path: "pageNotFound", component: PageNotFoundComponent },
  { path: "**", redirectTo: "pageNotFound", pathMatch: "full" }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class RoutingModule { }

