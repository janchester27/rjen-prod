import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessDialogComponent } from './dialog/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialog/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    SuccessDialogComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ButtonModule
  ]
})
export class SharedModule { }
