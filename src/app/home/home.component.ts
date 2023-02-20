import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../shared/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StorageService } from './../services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyComponent } from '../add-company/add-company.component';
import { DeleteDialogComponent } from '../shared/dialog/delete-dialog/delete-dialog.component';

export interface UserData {
  id: string;
  companyName: string;
  email: string;
  phone: number;
  createdAt: string;
  address: string;
  action: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [],
})
export class HomeComponent implements AfterViewInit, MaterialModule {
  displayedColumns: string[] = [
    'id',
    'companyName',
    'email',
    'phone',
    'createdAt',
    'address',
    'action',
  ];
  dataSource: MatTableDataSource<UserData>;
  myFormData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private storageservice: StorageService,
    private dialog: MatDialog
  ) {
    // Assign the data to the data source for the table to render
    this.myFormData = this.storageservice.getData('formData');
    this.dataSource = new MatTableDataSource(this.myFormData);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCompanyDetails(row: any) {
    this.dialog.open(AddCompanyComponent, {
      data: row,
      width: '50vw',
      height: '90vh',
    });
  }

  deleteCompanyDetails(index: any) {
    this.dialog
      .open(DeleteDialogComponent, {})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          let newCompanyData = JSON.parse(
            localStorage.getItem('formData') || ''
          );
          newCompanyData.splice(index, 1);
          localStorage.clear();
          this.storageservice.saveData('formData', newCompanyData);
          console.log('Record removed from table');
          this.myFormData = this.storageservice.getData('formData');
          this.dataSource = new MatTableDataSource(this.myFormData);
          this.ngAfterViewInit();
        }
      });
  }
}
