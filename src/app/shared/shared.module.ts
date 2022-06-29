import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidebarComponent } from './slidebar/slidebar.component';



@NgModule({
  declarations: [ SlidebarComponent],

  exports: [
    SlidebarComponent
  ],
  imports: [
    CommonModule
  ],



})
export class SharedModule { }
