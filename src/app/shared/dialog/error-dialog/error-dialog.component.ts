import { Component, OnInit, Inject } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.css'
})
export class ErrorDialogComponent {

  public message: string;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.message = this.config.data?.message || 'Default error message'; // Ensure default message
  }
  }
