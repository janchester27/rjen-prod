import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent {

  constructor(public dialogRef: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.dialogRef.close();
    }, 1500); // Adjust the time (in milliseconds) as needed, 2500ms = 2.5 seconds
  }

}
