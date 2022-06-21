import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  useLandscape = false;
  constructor() {
    window.onload = () => {
      if (window.innerHeight > window.innerWidth) {
        this.useLandscape = true;
      } else {
        this.useLandscape = false;
      }
    };

   }

  ngOnInit(): void {
  }

  @HostListener('window:resize') updateOrientatioState(): any {
    if (window.innerHeight > window.innerWidth) {
      this.useLandscape = true;
    } else {
      this.useLandscape = false;
    }
  }
}
