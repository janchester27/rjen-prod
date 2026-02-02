import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { StyleClassModule } from 'primeng/styleclass';
import { RippleModule } from 'primeng/ripple';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    SidenavComponent,
    FooterComponent
  ],
  imports: [
    DynamicDialogModule,
    RouterModule,
    CommonModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    StyleClassModule,
    RippleModule,
    SplitButtonModule,
    MenuModule,
    BrowserModule
  ],
  providers: [
    provideClientHydration(), provideAnimationsAsync(), ConfirmationService, MessageService, DialogService, DynamicDialogRef, DynamicDialogConfig
  ],
})
export class CoreModule { }
