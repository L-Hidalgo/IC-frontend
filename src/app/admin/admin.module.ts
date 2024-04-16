import { NgModule } from '@angular/core';
import { ComponentsModule, MaterialModule } from 'core-lib';
import { LayoutsPageComponent } from './layouts-page/layouts-page.component';
import { InputsPageComponent } from './inputs-page/inputs-page.component';
import { RadioButtonPageComponent } from './radio-button-page/radio-button-page.component';
import { CheckButtonPageComponent } from './check-button-page/check-button-page.component';
import { OutputsPageComponent } from './outputs-page/outputs-page.component';
import { ButtonsPageComponent } from './buttons-page/buttons-page.component';
import { CardsPageComponent } from './cards-page/cards-page.component';
import { CommonModule } from '@angular/common';
import { ClasificadorPageComponent } from './clasificador-page/clasificador-page.component';
import { MessagePageComponent } from './message-page/message-page.component';
import { TableViewComponent } from './table-view/table-view.component';
import { AlertsPageComponent } from './alerts-page/alerts-page.component';

@NgModule({
  declarations: [
    LayoutsPageComponent,
    InputsPageComponent,
    RadioButtonPageComponent,
    CheckButtonPageComponent,
    OutputsPageComponent,
    ButtonsPageComponent,
    CardsPageComponent,
    ClasificadorPageComponent,
    MessagePageComponent,
    TableViewComponent,
    AlertsPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule
  ],
  providers: [
  ],
  exports: [

  ]
})
export class AdminModule { }