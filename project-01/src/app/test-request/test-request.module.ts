import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestRequestGetComponent } from './test-request-get/test-request-get.component';



@NgModule({
  declarations: [
    TestRequestGetComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TestRequestGetComponent
  ]
})
export class TestRequestModule { }
