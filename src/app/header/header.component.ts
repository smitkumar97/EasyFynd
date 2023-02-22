import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private sidebarService: SidebarService,
    private dialog: MatDialog,
    ) {}

  ngOnInit() {}

  toggleSideNav() {
    this.sidebarService.toggle();
  }

  openCompanyFormDialog () {
    this.dialog
    .open(AddCompanyComponent, {
      width: '50vw',
      height: '90vh',
    }).afterClosed().subscribe(e=> {
      console.log('sjnjsn',e);
      this.dialog.closeAll();
    })
  }
}
