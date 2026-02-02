import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointOfSalesComponent } from './point-of-sales/point-of-sales.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CalculatorComponent } from './calculator/calculator.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoidComponent } from './void/void.component';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MessagesModule } from 'primeng/messages';
import { StepperModule } from 'primeng/stepper';
import { InputOtpModule } from 'primeng/inputotp'
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [

      PointOfSalesComponent,
      CalculatorComponent,
      KeyboardComponent,
      VoidComponent,
      ResetPasswordComponent

  ],
  imports: [

    CommonModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    DialogModule,
    TooltipModule,
    StepsModule,
    MessagesModule,
    StepperModule,
    InputOtpModule,
    PasswordModule
  ]
})
export class FeaturesModule { }
