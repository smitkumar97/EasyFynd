import { Component, OnInit } from '@angular/core';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'EasyFynd';
  sidebarState: any;

  constructor(private sidebarService: SidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarStateObservable$.subscribe(
      (newState: string) => {
        this.sidebarState = newState;
      }
    );
  }
}
