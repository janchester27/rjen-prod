import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentDate: Date = new Date();

  ngOnInit() {
    interval(1000).pipe(
      map(() => {
        this.currentDate = new Date();
      })
    ).subscribe();
  }

}
