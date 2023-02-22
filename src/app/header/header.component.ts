import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddCompanyComponent } from '../add-company/add-company.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private sidebarService: SidebarService,
    ) {}

  ngOnInit() {}

  toggleSideNav() {
    this.sidebarService.toggle();
  }
}
