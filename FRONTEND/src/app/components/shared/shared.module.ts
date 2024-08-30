import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';



@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      DialogComponent,
  ],
  exports: [
      CommonModule,
      DialogComponent,
  ],
  providers: [],
})
export class SharedModule {
  constructor() {}
}
