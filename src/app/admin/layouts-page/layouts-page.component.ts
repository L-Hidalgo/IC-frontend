import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layouts-page',
  templateUrl: './layouts-page.component.html',
  styleUrls: ['./layouts-page.component.css']
})
export class LayoutsPageComponent implements OnInit {

  layoutColumn: string = `
  <siat-body-card>
    <siat-column fxLayout="column">
      <siat-column fxLayout="column">
        <mat-form-field appearance="outline"> <input matInput> </mat-form-field>
        <mat-form-field appearance="outline"> <input matInput> </mat-form-field>
      </siat-column>
    </siat-column>
  </siat-body-card>`;

  layoutRow: string = `
  <siat-body-card>
    <siat-column>
      <siat-row>
        <mat-form-field appearance="outline" fxFlex="50"> <input matInput> </mat-form-field>
        <mat-form-field appearance="outline" fxFlex="50"> <input matInput> </mat-form-field>
      </siat-row>
      <siat-row>
        <mat-form-field appearance="outline" fxFlex="33"> <input matInput> </mat-form-field>
        <mat-form-field appearance="outline" fxFlex="34"> <input matInput> </mat-form-field>
        <mat-form-field appearance="outline" fxFlex="33"> <input matInput> </mat-form-field>
      </siat-row>
    </siat-column>
  </siat-body-card>`;

  layoutWarp: string = `
  <siat-body-card>
    <siat-wrap fxLayoutGap="15px">
      <siat-text-output fxLayout="row" label="Campo 1:" value="Valor 1"></siat-text-output>
      <siat-text-output fxLayout="row" label="Campo 2:" value="Valor 2"></siat-text-output>
    </siat-wrap>
  </siat-body-card>`;

  layoutBox: string = `
  <siat-body-card>
    <siat-row>
      <siat-box fxFlex="50">
        <siat-wrap>
          <siat-text-output fxLayout="row" label="Campo 1:" value="Valor 1"></siat-text-output>
          <siat-text-output fxLayout="row" label="Campo 2:" value="Valor 2"></siat-text-output>
        </siat-wrap>
      </siat-box>
      <siat-box fxFlex="50">
        <siat-wrap fxLayoutGap="20px">
          <siat-text-output fxLayout="column" label="Campo 1:" value="Valor 1"></siat-text-output>
          <siat-text-output fxLayout="column" label="Campo 2:" value="Valor 2"></siat-text-output>
        </siat-wrap>
      </siat-box>
    </siat-row>
  </siat-body-card>`;

  layoutItem: string = `
  <siat-body-card>
    <siat-column>
      <siat-item>
        <siat-group label="Item de Lectura">
          <siat-wrap>
            <siat-text-output fxLayout="row" label="Campo 1:" value="Valor 1"></siat-text-output>
            <siat-text-output fxLayout="row" label="Campo 2:" value="Valor 2"></siat-text-output>
          </siat-wrap>
        </siat-group>
      </siat-item>
      <siat-item>
        <div>
          <siat-group label="Item editable">
              <siat-wrap>
                <siat-text-output fxLayout="row" label="Campo 1:" value="Valor 1"></siat-text-output>
                <siat-text-output fxLayout="row" label="Campo 2:" value="Valor 2"></siat-text-output>
              </siat-wrap>
          </siat-group>
        </div>
        <div actions>
          <button mat-icon-button>
            <mat-icon color="secondary">remove</mat-icon>
          </button>
        </div>
      </siat-item>
      <div matRipple>
        <siat-item>
          <div leading>
            <siat-fa-icon icon="fa-solid fa-cube" size="25px" color="accent"></siat-fa-icon>
          </div>
          <siat-group label="Item seleccionable">
            <siat-wrap>
              <siat-text-output fxLayout="row" label="Campo 1:" value="Valor 1"></siat-text-output>
              <siat-text-output fxLayout="row" label="Campo 2:" value="Valor 2"></siat-text-output>
            </siat-wrap>
          </siat-group>
          <div actions>
            <mat-icon color="secondary">chevron_right</mat-icon>
          </div>
        </siat-item>
      </div>
    </siat-column>
  </siat-body-card>`;
  
  stepper: string = `
  <mat-stepper>
    <mat-step label="UNO">
      <siat-text-output label="Numero" value="Uno"></siat-text-output>
    </mat-step>
    <mat-step label="DOS">
      <siat-text-output label="Numero" value="Dos"></siat-text-output>
    </mat-step>
    <mat-step label="TRES">
      <siat-text-output label="Numero" value="Tres"></siat-text-output>
    </mat-step>
  </mat-stepper>`;
  
  constructor() { }

  ngOnInit(): void {
  }

}
