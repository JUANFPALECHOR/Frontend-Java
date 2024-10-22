import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AtomicModule } from '../atomic-design/atomic.module';


import { CreateBrandComponent } from './pages/create-brand.component';



const routes: Routes = [
  { path: 'new', component: CreateBrandComponent },         
];

@NgModule({
  declarations: [
    CreateBrandComponent,  
  ],
  imports: [
    CommonModule,
    FormsModule,          
    ReactiveFormsModule,   
    RouterModule.forChild(routes),  
    AtomicModule
  ]
})
export class BrandModule { }
