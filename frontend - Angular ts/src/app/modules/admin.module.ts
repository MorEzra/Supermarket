import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './../components/admin/admin.component';
import { ProductsComponent } from '../components/products/products.component';

import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: "", canActivate: [AdminGuard], component: AdminComponent,
    children: [
        { path: "", redirectTo: "products", pathMatch: "full" },
        { path: "products", component: ProductsComponent },
    ]
  }
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    SharedModule,MaterialModule,
    CommonModule,FormsModule,
    RouterModule.forChild(routes)
  ],
})
export class AdminModule { }
