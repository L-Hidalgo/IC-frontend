import { NgModule } from '@angular/core';
import { CoreLibModule } from 'core-lib';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { ReadTokenComponent } from './read-token/read-token.component';


@NgModule({
  declarations: [
    DemoPageComponent,
    ReadTokenComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    CoreLibModule,
    AppRoutingModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class PagesModule { }