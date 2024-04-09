import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ClasificadoresService } from 'core-lib';
import { Clasificador } from 'core-lib/lib/models/clasificador';

@Component({
  selector: 'app-check-button-page',
  templateUrl: './check-button-page.component.html',
  styleUrls: ['./check-button-page.component.css']
})
export class CheckButtonPageComponent implements OnInit {

  checkButtonSimple: string = `
  <siat-body-card>
    <siat-row>
      <siat-check-title title="Computarizada" fxFlex="50" (selectedChange)="simpleSelect($event)">
        <siat-label-output label="No requiere firma digital"></siat-label-output>
      </siat-check-title>
      <siat-check-title title="Electronica" fxFlex="50">
        <siat-label-output label="Requiere firma digital"></siat-label-output>
      </siat-check-title>
    </siat-row>
  </siat-body-card>`;

  checkButtonItem: string = `
  <siat-body-card>
    <siat-column>
      <siat-check-item title="Computarizada" fxFlex="50" >
        <siat-label-output label="No requiere firma digital"></siat-label-output>
      </siat-check-item>
      <siat-check-item title="Electronica" fxFlex="50">
        <siat-label-output label="Requiere firma digital"></siat-label-output>
      </siat-check-item>
    </siat-column>
  </siat-body-card>`;

  checkButtonSheet: string = `
  <siat-body-card>
    <ng-template #bottomSheetCheck>     
      <siat-clasificador-checkbox [clasificadoresService]="checkBoxClasificadorService" (closeSelect)="closeCombo()" [visibleButton]="true"></siat-clasificador-checkbox>
    </ng-template>
    <p>Selección Multiple: {{selectedCheckBox | json}}</p>
    <siat-row>
      <siat-button color="btn-outline-primary" (onClick)="openBottom(bottomSheetCheck)">Open CheckBox</siat-button>
    </siat-row>
  </siat-body-card>`;
  
  constructor(private bottomSheet: MatBottomSheet) { 
    this.checkBoxClasificadorService = new ClasificadoresService();
  }

  public checkBoxClasificadorService: ClasificadoresService;

  ngOnInit(): void {
    this.checkBoxClasificadorService.setDataList ([
      { id: 1, descripcion: 'One' },
      { id: 2, descripcion: 'two' },
      { id: 3, descripcion: 'Three' },
      { id: 4, descripcion: 'Four' },
      { id: 5, descripcion: 'five' },
      { id: 6, descripcion: 'Six' },
    ]);
  }

  openBottom (layout:TemplateRef<any>) {
    this.bottomSheet.open(layout);
  }

  selectedCheckBox!: Clasificador[];
  closeCombo() {
    this.selectedCheckBox = this.checkBoxClasificadorService.getSelectedItems();
    this.bottomSheet.dismiss();
  }

  simpleSelect(evt:any) {
    console.log(evt);
  }
}
