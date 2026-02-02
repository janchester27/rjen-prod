import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { AuthModule } from '../features/auth/auth.module';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FeaturesModule } from '../features/features.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    PasswordModule,
    InputTextModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturesModule
  ],
  providers: [
    provideClientHydration(), provideAnimationsAsync(), ConfirmationService, MessageService, DialogService, DynamicDialogRef, DynamicDialogConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
