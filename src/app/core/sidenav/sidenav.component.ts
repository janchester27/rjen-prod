import { Component, Input, Output, EventEmitter, HostListener, OnInit } from '@angular/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { navbar } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', keyframes([
          style({ transform: 'rotate(0deg)', offset: '0' }),
          style({ transform: 'rotate(2turn)', offset: '1' })
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  rightclose: boolean = true;
  leftclose: boolean = false;

  @Input() collapsed = true;
  @Input() screenWidth = 768;

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  nav = navbar;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    this.rightclose = !this.rightclose;
    this.leftclose = !this.leftclose;
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    this.rightclose = !this.rightclose;
    this.leftclose = false;
  }

  // openConfirmDialog(reverseButtons: boolean) {
  //   const dialogRef = this.dialog.open(SuppliesDialogComponent, {
  //     width: '300px',
  //     data: { title: 'Logout Confirmation', message: 'Are you sure you want to logout?', reverseButtons: reverseButtons }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       sessionStorage.clear();
  //       this.router.navigate(['login']);
  //     }
  //   });
  // }

  toggleChildrenVisibility(parentOption: any) {
    parentOption.childrenVisible = !parentOption.childrenVisible;
  }
}
