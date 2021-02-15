import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../components/products/products.component';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { StoreComponent } from '../components/store/store.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule],
  declarations: [ProductsComponent, StoreComponent],
  exports: [ProductsComponent, StoreComponent, FormsModule]
})
export class SharedModule { }
