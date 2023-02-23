import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AddCompanyComponent } from './add-company/add-company.component';
import { HeaderComponent } from './header/header.component';
import { SidenavModule } from 'angular-ng-sidenav';
import { HomeModule } from './home/home.module';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCompanyComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HomeModule,
  ],
  providers: [SidenavModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
