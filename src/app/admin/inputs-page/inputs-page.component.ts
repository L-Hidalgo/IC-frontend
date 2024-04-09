import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextRawInputComponent } from 'core-lib';
import { Clasificador } from 'src/app/models/clasificador';

@Component({
  selector: 'app-inputs-page',
  templateUrl: './inputs-page.component.html',
  styleUrls: ['./inputs-page.component.css']
})
export class InputsPageComponent implements OnInit, AfterViewInit, AfterViewChecked {

  constructor(private readonly changeDetectorRef: ChangeDetectorRef) { }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }
  formGroupObj: FormGroup = new FormGroup ({});

  decimalNumber: number = 1351633.25;
  decimalMoney: number = 0;
  areaText: string = '';
  persona?: Person;

  lastName:string = '';
  name: string = '';


  defaultDate = new Date()

  clasificadorList: Clasificador [] = [
    {
      id: 1,
      descripcion: 'One'
    },
    {
      id: 2,
      descripcion: 'Two'
    },
    {
      id: 3,
      descripcion: 'three'
    },
    {
      id: 4,
      descripcion: 'Four'
    },
  ]

  ngOnInit(): void {
    this.formGroupObj = new FormGroup ({});
    let newDate = new Date().toISOString();
    this.persona = {age: 0, name:'jose', simpleDate: new Date()};
    this.loadForm();
  }

  @ViewChild('email') email?: TextRawInputComponent;
  ngAfterViewInit(): void {
    // this.email?.addValidator(Validators.required);
    // this.email?.addValidator(Validators.email);
    this.email?.addValidator(Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"));
  }
  onClick() {
    console.log('OK');
  }

  // source code 
  basicData: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
      <siat-text-input [formGroup]="formGroupObj" [(model)]="name" errorMsg="El texto debe tener maximo 6 caracteres" label="Nombre" [maxLength]="6" ></siat-text-input>
      <siat-text-input [formGroup]="formGroupObj" [(model)]="lastName" errorMsg="El texto debe ser mayor a 8 caracteres" label="apellido" [minLength]="8" ></siat-text-input>
      <siat-text-raw-input [formGroup]="formGroupObj" [disabled]="false" #email [(model)]="persona!.email" label="Correo" errorMsg="Formato invalido"></siat-text-raw-input>
      <siat-date-input [required]="true" [defaultDate]="defaultDate" [formGroup]="formGroupObj" [(model)]="persona!.simpleDate" errorMsg="Debe seleccionar una Fecha" label="Fecha de Nacimiento" ></siat-date-input>
    </siat-column>
    <siat-column>
      <button mat-raised-button color="primary" [disabled]="!formGroupObj.valid" (click)="onClick()">Create</button>
    </siat-column>
  </siat-body-card>`;

  numberInput: string = `
  <siat-body-card>
    <siat-number-input  [(model)]="persona!.age" errorMsg="Numero entre 200 y 1500" label="Nro Entero " [min]="200" [max]="1500"></siat-number-input>
    <siat-number-input  [(model)]="persona!.age" errorMsg="Numero entre 200 y 1500" label="Nro Entero con mask" [min]="200" [max]="1500"></siat-number-input>
    <siat-decimal-input  [(model)]="decimalNumber" errorMsg="Numero Decimal" label="Nro Decimal" [min]="1000000"  [maxDecimals]="3"  ></siat-decimal-input> 
  </siat-body-card>`;

  nomeyInput: string = `
  <siat-body-card>
    <siat-money-input [(model)]="decimalMoney" errorMsg="Numero Decimal 250 < x < 280" label="Nro Decimal" [maxDecimals]="2" [min]="250" [max]="280" currency="Bs"></siat-money-input>
  </siat-body-card>`;

  textAreaInput: string = `
  <siat-body-card>
    <siat-text-area-input label="TextArea" [minRows]="3" [maxRows]="6"    [(model)]="areaText" errorMsg="llenar campo"></siat-text-area-input>
  </siat-body-card>`;

  checkDescriptionInput: string = `
  <siat-row>
    <siat-column fxFlex="33">
      <siat-check-input title="Title 1" description="This is a check"></siat-check-input>
    </siat-column>
    <siat-column fxFlex="34">
      <siat-check-input title="Title 2" description="This is a check"></siat-check-input>
    </siat-column>
    <siat-column fxFlex="33">
      <siat-check-input title="Title 3" description="This is a check"></siat-check-input>
    </siat-column>
  </siat-row>`;

  checkInput: string = `
  <siat-row>
    <siat-column fxFlex="33">
      <siat-check-input title="Title 1"></siat-check-input>
    </siat-column>
    <siat-column fxFlex="34">
      <siat-check-input title="Title 2"></siat-check-input>
    </siat-column>
    <siat-column fxFlex="33">
      <siat-check-input title="Title 3"></siat-check-input>
    </siat-column>
  </siat-row>`;

  clasificadorInput: string = `
  <siat-body-card>
    <siat-select-clasificador [list]="clasificadorList" appearance="outline" (onSelected)="selected($event)"></siat-select-clasificador>
    <siat-select-clasificador [list]="clasificadorList" label="Clasificador" (onSelected)="selected($event)"></siat-select-clasificador>
  </siat-body-card>`;

  modalMessage: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="10px">
        <siat-modal-message type="success" title="Opps" message="Desea imprimir registro?" [(model)]="success" (clickOk)="modalOk()" (clickCancel)="modalCancel()"></siat-modal-message>
        <siat-modal-message type="error" title="Error title"  [(model)]="error"></siat-modal-message>
        <siat-modal-message type="info" title="info title"  [(model)]="info"></siat-modal-message>
        <siat-modal-message type="warning" title="warning title"  [(model)]="warning"></siat-modal-message>
        <button (click)="success = true">success {{success}}</button>
        <button (click)="error = true">Error {{error}}</button>
        <button (click)="info = true">info {{info}}</button>
        <button (click)="warning = true">warning {{warning}}</button>
    </siat-column>
  </siat-body-card>`;

  inputSearch: string = `
<siat-column>
  <siat-search-text (modelChange)="buscarSistema($event)"></siat-search-text>
</siat-column>`;

  formGroup!: FormGroup;
  formControlName!: FormControl;
  nameString: string = '';

  loadForm () {
    this.formGroup = new FormGroup ({});
  }
  
  submitForm() {
    console.log('SUBMIT FORM');
  }

  selected (evt:any) {
    console.log('Select: ',evt);
  }

  success: boolean = false;
  error: boolean = false;
  info:boolean = false;
  warning: boolean = false;
  modalOk () {
    console.log('OK');
  }
  modalCancel () {
    console.log('CANCEL');
  }

  buscarSistema(nombre: string) {
    console.log("Buscando", nombre);
  }

}

interface Person {
  name?: string;
  lastName?: string;
  age?: number;
  simpleDate?: Date;
  email?: string;
}
