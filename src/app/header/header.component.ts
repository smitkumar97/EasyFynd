import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private sidebarService: SidebarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  toggleSideNav() {
    this.sidebarService.toggle();
  }
}
