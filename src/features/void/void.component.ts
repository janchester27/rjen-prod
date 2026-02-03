import { Component, ViewChild, AfterViewInit, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PinCodeValidator, UserIdValidator } from '../../app/shared/validators/validators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ERROR_MESSAGES } from '../../app/shared/constants/constants';
import { FeaturesService } from '../features.service';
import { DynamicDialogRef, DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ErrorDialogComponent } from '../../app/shared/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../app/shared/dialog/success-dialog/success-dialog.component';

interface User{
  user_id: number;
  user_name: string;
}

@Component({
  selector: 'app-void',
  templateUrl: './void.component.html',
  styleUrl: './void.component.css'
})
export class VoidComponent implements OnInit {

  pincode!: string;
  username!: string;
  userName: User[] = [];
  isSmallScreen: boolean = false;
  ispiFormEditable: boolean = true;
  isliFormEditable: boolean = true;
  iscredsFormEditable: boolean = true;
  isCloseHovered: boolean = false;
  piForm!: FormGroup;
  user_id: any = sessionStorage.getItem('user_id')

  @Output() verificationResult: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private service: FeaturesService,
    private dialog: DialogService,
    private dialogRef: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result: any) => (this.isSmallScreen = result.matches));

      this.piForm = this._formBuilder.group({
        unCtrl: ['', [Validators.required, UserIdValidator]],
        pcCtrl: ['', [Validators.required, PinCodeValidator]],
      });
  }

  invalidUserId = ERROR_MESSAGES.invalidUserId;
  invalidPinCode = ERROR_MESSAGES.invalidPinCode;

  openErrorDialog(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data: { errorMessage: message, message: 'Invalid Pincode!' }
    });
  }

  openSuccessDialog(): void {
    this.dialog.open(SuccessDialogComponent, {
      width: '250px'
    });
  }

  verifyPincode() {
    this.ispiFormEditable = false;
    this.isliFormEditable = false;
    this.iscredsFormEditable = false;

    const regdata = {
      "user_id": String(this.username),
      "pincode": String(this.pincode),
    };

    this.service.verifyPinCode(regdata).subscribe(
      (data) => {
        if (data.message === 'Invalid Pincode!') {
          this.openErrorDialog(data.message);
          this.verificationResult.emit(false);
        } else {
          this.openSuccessDialog();
          this.verificationResult.emit(true);
          this.dialogRef.close(true); // Close the dialog and indicate success
        }
      },
      (error) => {
        this.openErrorDialog('An error occurred');
        this.verificationResult.emit(false);
      }
    );
  }

  get pcCtrl(){
    return this.piForm.get('pcCtrl')
  }

  get unCtrl(){
    return this.piForm.get('unCtrl')
  }

  onInputChange(event: any, field: string): void {
    const input = event.target.value;
    const numberValue = input.replace(/[^0-9]/g, '');

    if (field === 'pincode') {
      this.pincode = numberValue;
      if (this.pcCtrl) {
        this.pcCtrl.setValue(this.pincode, { emitEvent: false });
      }
    } else if(field === 'username'){
      this.username = numberValue;
      if (this.unCtrl) {
        this.unCtrl.setValue(this.username, { emitEvent: false });
      }
    }
  }

}
