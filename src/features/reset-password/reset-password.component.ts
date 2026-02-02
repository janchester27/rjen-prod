
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, EmailValidator } from '@angular/forms';
import { StrongPasswordValidator } from '../../app/shared/validators/validators';
 import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ERROR_MESSAGES } from '../../app/shared/constants/constants';
import { FeaturesService } from '../features.service';
import { DialogRef } from '@angular/cdk/dialog';
import { error } from 'console';
import e from 'express';
import { ErrorDialogComponent } from '../../app/shared/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../app/shared/dialog/success-dialog/success-dialog.component';
import { ConfirmDialogComponent } from '../../app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';

interface User{
  user_id: number;
  user_name: string;
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})

export class ResetPasswordComponent implements OnInit{

  isAddPincode: boolean = false;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private service: FeaturesService,
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((result) => (this.isSmallScreen = result.matches));
    
      this.steps = [
        { label: 'Step 1: Email Confirmation' },
        { label: 'Step 2: Verification' },
        { label: 'Step 3: New Password' },
      ];
    
    // Initialize form groups in ngOnInit
    this.verificationForm = this._formBuilder.group({
      pwCtrl: ['', [Validators.required, StrongPasswordValidator,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#.$%^&])[a-zA-Z0-9!@#.$%^&]{8,}$')]]
    });

    this.emailForm = this._formBuilder.group({
      emCtrl: ['', [Validators.required, Validators.email]]
    });

    this.newPasswordForm = this._formBuilder.group({
      pwCtrl: ['', [Validators.required, StrongPasswordValidator,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#.$%^&])[a-zA-Z0-9!@#.$%^&]{8,}$')]],
        cpwCtrl: ['', [Validators.required, StrongPasswordValidator,
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#.$%^&])[a-zA-Z0-9!@#.$%^&]{8,}$')]]
    });

    this.confirmNewPasswordForm = this._formBuilder.group({
      pwCtrl: ['', [Validators.required, StrongPasswordValidator,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#.$%^&])[a-zA-Z0-9!@#.$%^&]{8,}$')]]
    });
  }


  closeDialog(){
    this.dialogRef.close()
   }

  ngAfterViewInit(): void {
    // Stepper is now initialized
  }

  email!: string;
  password!: any;
  verificationCode!: any;
  confirmPassword!: any;
  pincode!: string;
  username!: string;
  userName: User[] = [];
  isSmallScreen: boolean = false;
  ispiFormEditable: boolean = true;
  isliFormEditable: boolean = true;
  iscredsFormEditable: boolean = true;
  verificationForm!: FormGroup;
  emailForm!: FormGroup;
  newPasswordForm!: FormGroup;
  confirmNewPasswordForm!: FormGroup;
  isCloseHovered: boolean = false;
  user_id: any = sessionStorage.getItem('user_id')
  user_email: any = sessionStorage.getItem('email')
  activeStep: number = 0;
  steps!: MenuItem[];

  invalidPassword = ERROR_MESSAGES.invalidPassword;
  invalidEmail = ERROR_MESSAGES.invalidEmailAddress;

  nextStep(): void {
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep++;
    }
  }

  previousStep(): void {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  resetStepper(): void {
    this.activeStep = 0;
  }

  openErrorDialog(message: string): void {
    this.dialogService.open(ErrorDialogComponent, {
      width: '300px',
      data: { errorMessage: message, message: 'Something Went Wrong' }
    });
   }

   openSuccessDialog(): void {
    this.dialogService.open(SuccessDialogComponent, {
      width: '30%',
      data: {message: 'Verification Code sent successfully'}
    });
  }

  


  // send email verification

sendEmailVerification() {
  // Bind email from the form control
  this.email = this.emailForm.get('emCtrl')?.value;

  if (this.email === this.user_email) {
    this.ispiFormEditable = false;
    this.isliFormEditable = false;
    this.iscredsFormEditable = false;

    const regdata = {
      "email": this.email
    };

    console.log('Request Data:', regdata);

    this.service.sendEmailVerification(regdata).subscribe(
      (data) => {
        if (data.message === 'Something went wrong.') {
          console.log('Error:', data.message);
          this.openErrorDialog(data.message);
        } else {
          console.log('Success:', data);
          this.openSuccessDialog();
          this.nextStep(); // Move to the next step after success
        }
      },
      (error) => {
        const errorMessage = error.error ? error.error.message : 'Something went wrong';
        this.openErrorDialog(errorMessage);
        console.log('Request Error:', errorMessage);
      }
    );
  } else {
    const errorMessage = 'Something went wrong';
    this.openErrorDialog(errorMessage);
  }
}


  // verify email
  // send email verification

  verifyEmail(){

    this.verificationCode = this.verificationForm.get('pwCtrl')?.value;

    this.ispiFormEditable = false;
    this.isliFormEditable = false;
    this.iscredsFormEditable  = false;

    const regdata = {
      "email":this.user_email,
      "verificationCode": this.verificationCode
    }

    this.service.verifyEmail(regdata).subscribe(
      (data) => {
        if (data.message === 'Something went wrong.') {
          this.openErrorDialog(data.message); // Display the duplicate product error message
          // this.resetStepper();
        } else {
          this.openSuccessDialog(); // Display the success dialog
          this.nextStep(); // Move to the next step after success
        }
      },
      (error) => {
        const errorMessage = error.error ? error.error.message : 'Something went wrong';
        this.openErrorDialog(errorMessage);
        // this.resetStepper();
      }
    );

    console.log(regdata);
  }


  resetPassword(){

    this.password = this.newPasswordForm.get('pwCtrl')?.value;
    this.confirmPassword = this.newPasswordForm.get('cpwCtrl')?.value;

    if(this.password === this.confirmPassword){

      this.ispiFormEditable = false;
      this.isliFormEditable = false;
      this.iscredsFormEditable  = false;

      const regdata = {
        "email": this.email,
        "new_password": this.password
      }

      this.service.resetPassword(regdata).subscribe(
        (data) => {
          if (data.message === 'Something went wrong.') {
            this.openErrorDialog(data.message); // Display the duplicate product error message
          } else {
            this.openSuccessDialog(); // Display the success dialog
            this.resetStepper();
          }
        },
        (error) => {
          const errorMessage = error.error ? error.error.message : 'Something went wrong';
          this.openErrorDialog(errorMessage);
        }
      );

      console.log(regdata);
    }
    else{
      const errorMessage = 'Something went wrong';
      this.openErrorDialog(errorMessage);
    }

  }

  // get pcCtrl(){
  //   return this.piForm.get('pcCtrl')
  // }

  // onInputChange(event: any, field: string): void {
  //   const input = event.target.value;
  //   const numberValue = input.replace(/[^0-9]/g, '');

  //   if (field === 'pincode') {
  //     this.pincode = numberValue;
  //     if (this.pcCtrl) {
  //       this.pcCtrl.setValue(this.pincode, { emitEvent: false });
  //     }
  //   }
  // }
}
