import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ClasificadoresService } from 'core-lib';
import { Clasificador } from 'core-lib/lib/models/clasificador';

@Component({
  selector: 'app-radio-button-page',
  templateUrl: './radio-button-page.component.html',
  styleUrls: ['./radio-button-page.component.css']
})
export class RadioButtonPageComponent implements OnInit {

  radioButtonSimple: string = `
  <siat-row>
    <siat-radio-title title="Sistema Propietario" fxFlex="50">
      <siat-label-output label="No puede ser utilizado por terceros"></siat-label-output>
    </siat-radio-title>
    <siat-radio-title title="Sistema Proveedor" fxFlex="50">
      <siat-label-output label="Puede ser utilizado por terceros"></siat-label-output>
    </siat-radio-title>
  </siat-row>
  <siat-row>
    <siat-radio-title title="Sistema Propietario" fxFlex="50">
      <siat-label-output label="No puede ser utilizado por terceros"></siat-label-output>
    </siat-radio-title>
    <siat-radio-title title="Sistema Proveedor" fxFlex="50">
      <siat-label-output label="Puede ser utilizado por terceros"></siat-label-output>
    </siat-radio-title>
  </siat-row>`;

  radioButtonLista: string = `
  <siat-column>
    <siat-radio-item title="Sistema Propietario">
      <siat-label-output label="No puede ser utilizado por terceros"></siat-label-output>
    </siat-radio-item>
    <siat-radio-item title="Sistema Proveedor">
      <siat-label-output label="Puede ser utilizado por terceros"></siat-label-output>
    </siat-radio-item>
  </siat-column>`;

  radioButtonSheet: string = `
  <ng-template #bottomSheetRadio>
    <siat-clasificador-radio-select [clasificadoresService]="radioClasificadorService" (closeSelect)="closeRadio()"></siat-clasificador-radio-select>
  </ng-template>
  <p>Selección simple: {{selectedRadio| json}}</p>
  <siat-row>
    <siat-button color="btn-outline-primary" (onClick)="openBottom(bottomSheetRadio)">Open Radio</siat-button>
  </siat-row>`;

  constructor(private bottomSheet: MatBottomSheet) { 
    this.radioClasificadorService = new ClasificadoresService();
  }

  public radioClasificadorService: ClasificadoresService;

  ngOnInit(): void {
    this.radioClasificadorService.setDataList([
      { id: 1, descripcion: 'One' },
      { id: 2, descripcion: 'two' },
      { id: 3, descripcion: 'Three' },
    ]);
  }

  openBottom (layout:TemplateRef<any>) {
    this.bottomSheet.open(layout);
  }

  selectedRadio!: Clasificador;
  closeRadio () {
    this.selectedRadio = this.radioClasificadorService.getSelectedItem();
    this.bottomSheet.dismiss();
  }

}
