import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//modules
import { RoutingModule } from './routing.module';
import { ClientModule } from './client.module';
import { AdminModule } from './admin.module';

import { AuthenticationInterceptor } from '../interceptor/AuthenticationInterceptor';

//components
import { LayoutComponent } from '../components/layout/layout.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '../components/home/home.component';
import { PurchaseStatusComponent } from '../components/purchase-status/purchase-status.component';
import { UpdateProductDialogComponent } from '../components/update-product-dialog/update-product-dialog.component';
import { AddProductDialogComponent } from '../components/add-product-dialog/add-product-dialog.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

const routingModules = [
  RouterModule,
  RoutingModule,
  AdminModule,
  ClientModule,
  SharedModule
]

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    PurchaseStatusComponent,
    UpdateProductDialogComponent,
    AddProductDialogComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule, MaterialModule,
    [...routingModules]
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
