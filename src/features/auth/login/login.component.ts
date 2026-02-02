import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ErrorDialogComponent } from '../../../app/shared/dialog/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../../app/shared/dialog/success-dialog/success-dialog.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formGroup!: FormGroup;
  email: any;
  password: any;
  islogin: boolean = false;
  hide = true;
  msg: any;
  
  constructor(
    private router: Router,
    private authService: AuthService, 
    private ref: DynamicDialogRef,
    private dialogService: DialogService) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  
    toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  Login(form: any) {
    this.islogin = true;
    this.authService.Login(form).subscribe(
      (data) => {
        this.islogin = false;
        if (data.message === 'Invalid Credentials.') {
          this.dialogService.open(ErrorDialogComponent, {
            width: '300px',
            data: {
              message: data.message,
            },
          });
        } else if (data.message === 'Successfully logged in.') {
          this.dialogService.open(SuccessDialogComponent, {
            width: '300px',
            data: {
              message: data.message,
            },
          });
          this.authService.setSessionData(data);
          this.router.navigate(['dashboard/pos']);
        }
      },
      (error) => {
        this.islogin = false;
        this.dialogService.open(ErrorDialogComponent, {
          width: '300px',
          data: {
            message: error.error?.message || 'Something went wrong.',
          },
        });
      }
    );
  }
  
}
