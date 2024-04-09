import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/services/mensajes.service';

@Component({
  selector: 'app-outputs-page',
  templateUrl: './outputs-page.component.html',
  styleUrls: ['./outputs-page.component.css']
})
export class OutputsPageComponent implements OnInit {

  textColumnCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-text-output label="Label 1" value="Value 1"></siat-text-output>
      <siat-text-output label="Label 2" value="Value 2"></siat-text-output>
    </siat-column>
  </siat-body-card>`;

  textRowCode: string = `
  <siat-body-card>
    <siat-column>
      <siat-text-output fxLayout="row" label="Label 1:" value="Value 1"></siat-text-output>
      <siat-text-output fxLayout="row" label="Label 2:" value="Value 2"></siat-text-output>
      <siat-text-output fxLayout="row" label="Label 3:" value="Value 3"></siat-text-output>
    </siat-column>
  </siat-body-card>`;

  numberColumnCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-number-output label="Number 1" value="785965875"></siat-number-output>
      <siat-number-output label="Number 2" value="785967899"></siat-number-output>
    </siat-column>
  </siat-body-card>`;

  numberRowCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-number-output fxLayout="row" label="Number 1:" value="789654123"></siat-number-output>
      <siat-number-output fxLayout="row" label="Number 2:" value="123456789"></siat-number-output>
      <siat-number-output fxLayout="row" label="Number 3:" value="123456789"></siat-number-output>
    </siat-column>
  </siat-body-card>`;

  dateColumnCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-date-output label="Date 1" value="2022-09-14"></siat-date-output>
      <siat-date-output label="Date 2" value="2022-09-15"></siat-date-output>
    </siat-column>
  </siat-body-card>`;

  dateRowCode: string = `
  <siat-body-card>
    <siat-column>
      <siat-date-output fxLayout="row" label="Date 1:" value="2022-09-14"></siat-date-output>
      <siat-date-output fxLayout="row" label="Date 2:" value="2022-09-15"></siat-date-output>
      <siat-date-output fxLayout="row" label="Date 3:" value="2022-09-16"></siat-date-output>
    </siat-column>
  </siat-body-card>`;

  datetimeColumnCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-datetime-output label="Datetime 1" value="2021-10-15"></siat-datetime-output>
      <siat-datetime-output label="Datetime 2" value="2021-10-15"></siat-datetime-output>
    </siat-column>
  </siat-body-card>`;

  datetimeRowCode: string = `
  <siat-body-card>
    <siat-column>
      <siat-datetime-output fxLayout="row" label="Datetime 1:" value="2021-10-15">
      </siat-datetime-output>
      <siat-datetime-output fxLayout="row" label="Datetime 2:" value="2021-10-14">
      </siat-datetime-output>
      <siat-datetime-output fxLayout="row" label="Datetime 3:" value="2021-10-17">
      </siat-datetime-output>
    </siat-column>
  </siat-body-card>`;

  booleanColumnCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-boolean-output label="Boolean 1" value={{true}} trueDescription="Habilitado"
        falseDescription="No habilitado">
      </siat-boolean-output>
      <siat-boolean-output label="Boolean 2" value={{false}} trueDescription={{1}}
        falseDescription={{2}}>
      </siat-boolean-output>
    </siat-column>
  </siat-body-card>`;

  booleanRowCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-boolean-output fxLayout="row" label="Boolean 1:" value={{true}} trueDescription="Si"
        falseDescription="No">
      </siat-boolean-output>
      <siat-boolean-output fxLayout="row" label="Boolean 2:" value={{false}} trueDescription={{1}}
        falseDescription={{2}}>
      </siat-boolean-output>
      <siat-boolean-output fxLayout="row" label="Boolean 3:" value={{false}} trueDescription={{1}}
        falseDescription={{2}}>
      </siat-boolean-output>
    </siat-column>
  </siat-body-card>`;

  decimalColumnCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-decimal-output label="Decimal 1" value="1236548.123"></siat-decimal-output>
      <siat-decimal-output label="Decimal 1" value="1236548.1222222" [maxDecimals]="3">
      </siat-decimal-output>
    </siat-column>
  </siat-body-card>`;

  decimalRowCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-decimal-output fxLayout="row" label="Decimal 1:" value="1236548.123">
      </siat-decimal-output>
      <siat-decimal-output fxLayout="row" label="Decimal 1:" value="987456321.12358" [maxDecimals]="3">
      </siat-decimal-output>
      <siat-decimal-output fxLayout="row" label="Decimal10:" value="12563.7859" symbol="%">
      </siat-decimal-output>
    </siat-column>
  </siat-body-card>`;

  moneyColumnCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-money-output label="Money 1" value="15263256"></siat-money-output>
      <siat-money-output label="Money 1" value="15263256"></siat-money-output>
    </siat-column>
  </siat-body-card>`;

  moneyRowCode: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-money-output fxLayout="row" label="Money 1:" value="15263256" currency="$">
      </siat-money-output>
      <siat-money-output fxLayout="row" label="Money 2:" value="15263256" currency="$">
      </siat-money-output>
      <siat-money-output fxLayout="row" label="Money 3:" value="987456321.1236" [maxDecimals]="2" currency="$">                                
      </siat-money-output>
    </siat-column>
  </siat-body-card>`;

  barProgressCode: string = `
  <siat-column fxLayoutGap="15px" fxFlex="100">
    <siat-bar-progress percentage="50" type="bg-danger"></siat-bar-progress>
    <siat-bar-progress percentage="50" type="bg-info"></siat-bar-progress>
    <siat-bar-progress percentage="50" type="bg-success"></siat-bar-progress>
    <siat-bar-progress percentage="50" type="bg-warning"></siat-bar-progress>
    <siat-bar-progress percentage="50" type="bg-primary"></siat-bar-progress>
    <siat-bar-progress percentage="50" type="bg-inverse"></siat-bar-progress>
  </siat-column>`;

  groupCode: string = `
  <siat-item>
    <siat-group label="Grupo 1">
      <siat-wrap fxLayoutGap="20px">
        <siat-text-output fxLayout="row" label="Producto:" value="Tickets"></siat-text-output>
        <siat-money-output fxLayout="row" label="Money:" value="15263256" currency="$">
        </siat-money-output>
        <siat-date-output fxLayout="row" label="Date:" value="2022-09-14"></siat-date-output>
      </siat-wrap>
    </siat-group>
  </siat-item>`;

  labelCode: string = `
  <siat-body-card>
    <siat-label-output label="label 1"></siat-label-output>
    <siat-label-output label="label 2"></siat-label-output>
    <siat-label-output label="label 3"></siat-label-output>
  </siat-body-card>`;

  selectFilter: string = `
  <siat-body-card>
    <siat-column>
      <siat-select (onChange)="actionSelect($event)">
        <option value="0">Option 0</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </siat-select>
      <siat-select (onChange)="actionSelect($event)">
        <option *ngFor="let item of options" value="{{item}}">{{item}}</option>
      </siat-select>
    </siat-column>
  </siat-body-card>`;
  
  thumbBar: string = `
  <siat-body-card>
    <button mat-stroked-button (click)="openSnackBar()"> Show </button>
  </siat-body-card>`;
 
  options: any[] = [
    "value1", "value2", "value3"
  ];

  constructor(private _mensajesService: MensajesService) { }

  ngOnInit(): void {
  }

  actionSelect(evt: any) {
    console.log("VALUE select", evt);
  }

  openSnackBar() {
    this._mensajesService.setMensaje("Guardar Sistema", { transaccion: false, mensajes: [] });
  }
}
