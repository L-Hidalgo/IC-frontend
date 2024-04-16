import { Component, OnInit } from '@angular/core';
import { Clasificador } from 'src/app/models/clasificador';

@Component({
  selector: 'app-clasificador-page',
  templateUrl: './clasificador-page.component.html',
  styleUrls: ['./clasificador-page.component.css']
})
export class ClasificadorPageComponent implements OnInit {

  clasificadorItem: string = `
  <siat-body-card>
    <siat-clasificador-item [clasificador]="clasificador">
    </siat-clasificador-item>
  </siat-body-card>`;

  clasificadorItemIcono: string = `
  <siat-body-card>
    <siat-clasificador-item [clasificador]="clasificador" icon="fa fa-user">
    </siat-clasificador-item>
  </siat-body-card>`;

  clasificadorItemCompuesto: string = `
  <siat-body-card>
    <siat-clasificador-item [clasificador]="clasificador" icon="fa fa-user">
      <siat-wrap>
        <siat-text-output fxLayout="row" label="Id:" value="601"></siat-text-output>
        <siat-text-output fxLayout="row" label="Codigo:" value="2"></siat-text-output>
        <siat-text-output fxLayout="row" label="Abreviatura:" value="ELEC"></siat-text-output>
      </siat-wrap>
    </siat-clasificador-item>
  </siat-body-card>`;

  clasificadorListCompuesto: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="15px">
      <siat-clasificador-item [clasificador]="clasificador" icon="fa fa-user">
        <siat-wrap>
          <siat-text-output fxLayout="row" label="Id:" value="601"></siat-text-output>
          <siat-text-output fxLayout="row" label="Codigo:" value="2"></siat-text-output>
          <siat-text-output fxLayout="row" label="Abreviatura:" value="ELEC"></siat-text-output>
        </siat-wrap>
      </siat-clasificador-item>
      <siat-clasificador-item [clasificador]="clasificador" icon="fa fa-user">
        <siat-wrap>
          <siat-text-output fxLayout="row" label="Id:" value="601"></siat-text-output>
          <siat-text-output fxLayout="row" label="Codigo:" value="2"></siat-text-output>
          <siat-text-output fxLayout="row" label="Abreviatura:" value="ELEC"></siat-text-output>
        </siat-wrap>
      </siat-clasificador-item>
    </siat-column>
  </siat-body-card>`;

  clasificadorGroup: string = `
  <siat-body-card>
    <siat-clasificador-group [clasificador]="clasificador" icon="fa fa-user">
      <siat-wrap>
        <siat-text-output fxLayout="row" label="Id:" value="601"></siat-text-output>
        <siat-text-output fxLayout="row" label="Codigo:" value="2"></siat-text-output>
        <siat-text-output fxLayout="row" label="Abreviatura:" value="ELEC"></siat-text-output>
      </siat-wrap>
    </siat-clasificador-group>
  </siat-body-card>`;

  clasificadorListGroup: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="20px">
      <siat-clasificador-group [clasificador]="clasificador">
        <siat-label-output label="42563.256"></siat-label-output>
        <siat-progress-bar [width]="20" background="bg-info"></siat-progress-bar>
        <div actions>
          <h5>20%</h5>
        </div>
      </siat-clasificador-group>
      <siat-clasificador-group [clasificador]="clasificador">
        <siat-label-output label="42563.256"></siat-label-output>
        <siat-progress-bar [width]="20" background="bg-info"></siat-progress-bar>
        <div actions>
          <h5>20%</h5>
        </div>
      </siat-clasificador-group>
    </siat-column>
  </siat-body-card>`;
  
  clasificador: Clasificador = {
    descripcion: "Modalidad electronica",
    id: 601,
    abreviatura: "ELEC",
    equivalencia: "1"
  };

  constructor() { }

  ngOnInit(): void {
  }

}
