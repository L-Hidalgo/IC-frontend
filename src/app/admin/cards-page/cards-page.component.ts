import { Component, OnInit, TemplateRef } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-cards-page',
  templateUrl: './cards-page.component.html',
  styleUrls: ['./cards-page.component.css']
})
export class CardsPageComponent implements OnInit {

  cardTitle: string = `
  <siat-body-card>
    <siat-row>
      <siat-titles-card title="Title" subtitle="Sutitulo" fxFlex="33">
      </siat-titles-card>
      <siat-titles-card title="Title" subtitle="Sutitulo" fxFlex="34">
      </siat-titles-card>
      <siat-titles-card title="Title" subtitle="Sutitulo" fxFlex="33">
      </siat-titles-card>
    </siat-row>
  </siat-body-card>`;

  cardImage: string = `
  <siat-body-card>
    <siat-row>
      <siat-image-card title="Title" src="../../../../assets/images/puntoventa.png" subtitle="Subtitle" fxFlex="33">
        <siat-column head>
          <div> Texto descriptivo </div>
          <siat-button color="btn-warning" fxLayout="column" label="Acceder"></siat-button>
        </siat-column>
      </siat-image-card>
      <siat-image-card title="Title" src="../../../../assets/images/puntoventa.png" subtitle="Subtitle" fxFlex="34">
        <siat-column head>
          <div text> Texto descriptivo </div>
          <siat-button color="btn-success" fxLayout="column" label="Acceder"></siat-button>
        </siat-column>
      </siat-image-card>
      <siat-image-card title="Title" src="../../../../assets/images/puntoventa.png" subtitle="Subtitle" fxFlex="33">
        <siat-column head>
          <div text> Texto descriptivo </div>
          <siat-button color="btn-primary" fxLayout="column" label="Acceder"></siat-button>
        </siat-column>
      </siat-image-card>
    </siat-row>
  </siat-body-card>`;

  cardHeader: string = `
  <siat-body-card>
    <siat-row>
      <siat-header-card title="Title" subtitle="Subtitle" fxFlex="33" background="primary">
        <div head>
          <p>Texto descriptivo</p>
          <siat-button color="btn-primary" label="Acceder"></siat-button>
        </div>
      </siat-header-card>
      <siat-header-card title="Title" subtitle="Subtitle" fxFlex="34" background="success">
        <div head>
          <p>Texto descriptivo</p>
          <siat-button color="btn-success" label="Acceder"></siat-button>
        </div>
      </siat-header-card>
      <siat-header-card title="Title" subtitle="Subtitle" fxFlex="33" background="secondary">
        <div head>
          <p>Texto descriptivo</p>
          <siat-button color="btn-secondary" label="Acceder"></siat-button>
        </div>
      </siat-header-card>
    </siat-row>
  </siat-body-card>`;

  cardIconV: string = `
  <siat-body-card>
    <siat-row>
      <siat-icon-vcard title="Title" subtitle="Subtitle" icon="fa fa-home" fxFlex="33" background="warning">
      </siat-icon-vcard>
      <siat-icon-vcard title="Title" subtitle="Subtitle" icon="fa fa-home" fxFlex="34" background="info">
      </siat-icon-vcard>
      <siat-icon-vcard title="Title" subtitle="Subtitle" icon="fa fa-home" fxFlex="33" background="success">
      </siat-icon-vcard>
    </siat-row>
  </siat-body-card>`;

  cardIconH: string = `
  <siat-body-card>
    <siat-row>
      <siat-icon-hcard title="Title" subtitle="Subtitle" icon="fa fa-home" fxFlex="33" background="warning">
      </siat-icon-hcard>
      <siat-icon-hcard title="Title" subtitle="Subtitle" icon="fa fa-home" fxFlex="34" background="primary">
      </siat-icon-hcard>
      <siat-icon-hcard title="Title" subtitle="Subtitle" icon="fa fa-home" fxFlex="33" background="danger">
      </siat-icon-hcard>
    </siat-row>
  </siat-body-card>`;

  cardBackgroud: string = `
  <siat-body-card>
    <siat-row>
      <siat-background-card title="Title" subtitle="Subtitle" icon="fa fa-home" fxFlex="33" background="warning">
      </siat-background-card>
      <siat-background-card title="Title" subtitle="Subtitle" icon="fa fa-home" fxFlex="34" background="info">
      </siat-background-card>
      <siat-background-card title="Title" subtitle="Subtitle" icon="fa fa-home" fxFlex="33" background="success">
      </siat-background-card>
    </siat-row>
  </siat-body-card>`;

  cardCategory: string = `
  <siat-body-card>
    <siat-row>
      <siat-category-card title="Title" subtitle="Subtitle" icon="fa-regular fa-folder" fxFlex="33" background="warning">
        Otros atributos
      </siat-category-card>
      <siat-category-card title="Title" subtitle="Subtitle" icon="fa fa-play" fxFlex="34" background="info">
        Otros atributos
      </siat-category-card>
      <siat-category-card title="Title" subtitle="Subtitle" icon="fa fa-cube" fxFlex="33" background="success">
        Otros atributos
      </siat-category-card>
    </siat-row>
  </siat-body-card>`;

  cardStats: string = `
  <siat-body-card>
    <siat-row>
      <siat-stats-card title="Title" subtitle="Subtitle" icon="fa-regular fa-folder" fxFlex="33" background="warning">
      </siat-stats-card>
      <siat-stats-card title="Title" subtitle="Subtitle" icon="fa fa-play" fxFlex="34" background="info">
      </siat-stats-card>
      <siat-stats-card title="Title" subtitle="Subtitle" icon="fa fa-cube" fxFlex="33" background="success">
      </siat-stats-card>
    </siat-row>
  </siat-body-card>`;

  cardForm: string = `
  <siat-body-card>
    <siat-form-card title="Formulario" subtitle="Descripcion">
      <div actions>
        <siat-button-rounded label="Actualizar"></siat-button-rounded>
      </div>
      <div head>
        <h5>Otras opciones</h5>
      </div>
      <hr />
      <siat-body-card> Section 1 </siat-body-card>
      <hr />
      <siat-body-card> Section 2 </siat-body-card>
      <hr />
      <siat-body-card>
        <siat-button-rounded label="Aceptar"></siat-button-rounded>
        <siat-button-rounded label="Cancelar"></siat-button-rounded>
      </siat-body-card>
    </siat-form-card>
  </siat-body-card>`;

  cardSection: string = `
  <siat-body-card>
    <siat-section-card title="Seccion">
      <div actions>
        <button mat-icon-button color="primary">
          <siat-fa-icon icon="fa fa-plus"></siat-fa-icon>
        </button>
      </div>
      <siat-body-card>
        Contenido de la seccion.
      </siat-body-card>
    </siat-section-card>
  </siat-body-card>`;

  bottonSheet: string= `
  <siat-button label="MOSTRAR" (onClick)="mostrarBottonSheetCard(bottomSheetCard)"></siat-button>
  <ng-template #bottomSheetCard>  
    <siat-bottom-sheet-card title="Titulo" subtitle="Subtitulo" (onClick)="aceptarBottonSheetCard()">
      <siat-body-card>
        <div class="month" *ngFor="let item of [].constructor(5); let i = index">
          <h3>Contenido {{i}}</h3> {{item}}
        </div>
      </siat-body-card>
    </siat-bottom-sheet-card>
  </ng-template>`;

  constructor(private bottomSheet: MatBottomSheet,) { }

  ngOnInit(): void {
  }

  mostrarBottonSheetCard(layout: TemplateRef<any>) {
    this.bottomSheet.open(layout);
  }

  aceptarBottonSheetCard(){
    //codigo adicional
    this.bottomSheet.dismiss();
  }
}
