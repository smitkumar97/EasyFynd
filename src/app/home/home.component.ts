import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../shared/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { StorageService } from './../services/storage.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  customPaginator: any;

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
    this.myFormData = this.myFormData.map((ob: any, index: any) => {
      return { ...ob, id: index + 1 };
    });
    this.dataSource = new MatTableDataSource(this.myFormData);
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

  onPaginateChange(event: any) {
    this.customPaginator = event;
  }

  removeAndUpdateRecord(index: any) {
    let updatedIndex = index;
    if (this.customPaginator && Object.keys(this.customPaginator)?.length) {
      updatedIndex =
        this.customPaginator.pageIndex * this.customPaginator.pageSize +
        updatedIndex;
    }
    let newCompanyData = JSON.parse(localStorage.getItem('formData') || '');
    newCompanyData.splice(updatedIndex, 1);
    localStorage.clear();
    this.storageservice.saveData('formData', newCompanyData);
    this.myFormData = this.storageservice.getData('formData');
    this.dataSource = new MatTableDataSource(this.myFormData);
    this.ngAfterViewInit();
  }
  editCompanyDetails(row: any, index: any) {
    this.dialog
      .open(AddCompanyComponent, {
        data: row,
        width: '50vw',
        height: '90vh',
      })
      .afterClosed()
      .subscribe((result) => {
        console.log(result);
        return;
        if (result) {
          this.removeAndUpdateRecord(index);
        } else {
          return;
        }
      });
    return;
  }

  deleteCompanyDetails(index: any) {
    this.dialog
      .open(DeleteDialogComponent, {})
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.removeAndUpdateRecord(index);
        }
      });
  }
}
