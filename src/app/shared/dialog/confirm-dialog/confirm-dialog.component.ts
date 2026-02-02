import { Component, Inject, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  title!: string;
  message!: string;
  reverseButtons!: boolean;

  ngOnInit(): void {
    // Initialize dialog data from config
    this.title = this.config.data.title;
    this.message = this.config.data.message;
    this.reverseButtons = this.config.data.reverseButtons;
  }

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  onNoClick(): void {
    this.ref.close(false);
  }

  onYesClick(): void {
    this.ref.close(true);
  }

}
