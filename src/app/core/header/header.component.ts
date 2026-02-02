import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationService, MenuItem } from 'primeng/api'; // Import ConfirmationService
import { ConfirmDialogComponent } from '../../shared/dialog/confirm-dialog/confirm-dialog.component';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ResetPasswordComponent } from '../../../features/reset-password/reset-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  path: string[] = [];
  username!: any;
  currentDate: Date = new Date();
  items: MenuItem[] | undefined;
  ref: DynamicDialogRef | undefined;

  constructor(private router: Router, private dialogService: DialogService){
    this.username = sessionStorage.getItem('email');
    this.router.events
    .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    .subscribe((data: NavigationEnd) => {
      const parts = data.urlAfterRedirects.split('/').filter(part => part.length > 0);
      const decodedPath = parts.map(part => part.replace(/%20/g, ' '));
      this.path = decodedPath;
    });

  }
  
  toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Error attempting to enable full-screen mode:", err);
      });
    }
  }


  logout(reverseButtons: boolean) {
    this.ref = this.dialogService.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: 'Logout Confirmation', message: 'Are you sure you want to logout?', reverseButtons: reverseButtons }
    });

    this.ref.onClose.subscribe((result: boolean) => {
      if (result) {
        sessionStorage.clear();
        this.router.navigate(['login']);
      }
    });
  }

  changePassword(){
    this.router.navigate(['dashboard/reset-password'])
  }

  POS(){
    this.router.navigate(['dashboard/pos'])
  }

  ngOnInit() {
    interval(1000).pipe(
      map(() => {
        this.currentDate = new Date();
      })
    ).subscribe();

    this.items = [
      {
          items: [
              {
                  label: 'Full Screen',
                  icon: 'pi pi-window-maximize',
                  command: () => this.toggleFullScreen()
              },
              {
                label: 'Change Password',
                icon: 'pi pi-file-edit',
                command: () => this.changePassword()
              },
              {
                label: 'POS',
                icon: 'pi pi-cart-arrow-down',
                command: () => this.POS()
              },
              {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.logout(true)
              },
          ]
      }
  ];
  
  interval(1000).pipe(
    map(() => {
      this.currentDate = new Date();
    })
  ).subscribe();
}

}






