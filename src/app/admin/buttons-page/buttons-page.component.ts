import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons-page',
  templateUrl: './buttons-page.component.html',
  styleUrls: ['./buttons-page.component.css']
})
export class ButtonsPageComponent implements OnInit {

  buttonGeneral: string = `
  <siat-body-card>
    <siat-column>
      <siat-row>
        <siat-button-save></siat-button-save>
        <siat-button-cancel></siat-button-cancel>
      </siat-row>
      <siat-row>
        <siat-button-return></siat-button-return>
      </siat-row>
      <siat-row>
        <siat-button-menu [matMenuTriggerFor]="menu"></siat-button-menu>
      </siat-row>
      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>refresh</mat-icon>
          <span>Action 1</span>
        </button>
        <button mat-menu-item>
          <mat-icon>home</mat-icon>
          <span>Action 2</span>
        </button>
      </mat-menu>
    </siat-column>
  </siat-body-card>`;

  buttonRounded: string = `
  <siat-body-card>
    <siat-wrap>
      <siat-button-rounded color="btn-primary" label="Primary"></siat-button-rounded>
      <siat-button-rounded color="btn-secondary" label="Secondary"></siat-button-rounded>
      <siat-button-rounded color="btn-success" label="Success"></siat-button-rounded>
      <siat-button-rounded color="btn-info" label="Info"></siat-button-rounded>
      <siat-button-rounded color="btn-warning" label="Warning"></siat-button-rounded>
      <siat-button-rounded color="btn-danger" label="Danger"></siat-button-rounded>
      <siat-button-rounded color="btn-light" label="Light"></siat-button-rounded>
      <siat-button-rounded color="btn-dark" label="Dark"></siat-button-rounded>
    </siat-wrap>
  </siat-body-card>`;

  buttonRoundedFill: string = `
  <siat-body-card>
    <siat-column>
      <siat-button-rounded color="btn-primary" label="Primary" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-secondary" label="Secondary" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-success" label="Success" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-info" label="Info" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-warning" label="Warning" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-danger" label="Danger" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-light" label="Light" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-dark" label="Dark" fxLayout="column"></siat-button-rounded>
    </siat-column>
  </siat-body-card>`;

  buttonRoundedOutline: string = `
  <siat-body-card>
    <siat-wrap>
      <siat-button-rounded color="btn-outline-primary" label="Primary"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-secondary" label="Secondary"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-success" label="Success"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-info" label="Info"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-warning" label="Warning"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-danger" label="Danger"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-light" label="Light"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-dark" label="Dark"></siat-button-rounded>
    </siat-wrap>
  </siat-body-card>`;

  buttonRoundedOutlineFill: string = `
  <siat-body-card>
    <siat-column>
      <siat-button-rounded color="btn-outline-primary" label="Primary" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-secondary" label="Secondary" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-success" label="Success" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-info" label="Info" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-warning" label="Warning" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-danger" label="Danger" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-light" label="Light" fxLayout="column"></siat-button-rounded>
      <siat-button-rounded color="btn-outline-dark" label="Dark" fxLayout="column"></siat-button-rounded>
    </siat-column>
  </siat-body-card>`;

  button: string = `
  <siat-body-card>
    <siat-wrap>
      <siat-button color="btn-primary" label="Primary"></siat-button>
      <siat-button color="btn-secondary" label="Secondary"></siat-button>
      <siat-button color="btn-success" label="Success"></siat-button>
      <siat-button color="btn-info" label="Info"></siat-button>
      <siat-button color="btn-warning" label="Warning"></siat-button>
      <siat-button color="btn-danger" label="Danger"></siat-button>
      <siat-button color="btn-light" label="Light"></siat-button>
      <siat-button color="btn-dark" label="Dark"></siat-button>
    </siat-wrap>
  </siat-body-card>`;

  buttonFill: string = `
  <siat-body-card>
    <siat-column>
      <siat-button color="btn-primary" label="Primary" fxLayout="column"></siat-button>
      <siat-button color="btn-secondary" label="Secondary" fxLayout="column"></siat-button>
      <siat-button color="btn-success" label="Success" fxLayout="column"></siat-button>
      <siat-button color="btn-info" label="Info" fxLayout="column"></siat-button>
      <siat-button color="btn-warning" label="Warning" fxLayout="column"></siat-button>
      <siat-button color="btn-danger" label="Danger" fxLayout="column"></siat-button>
      <siat-button color="btn-light" label="Light" fxLayout="column"></siat-button>
      <siat-button color="btn-dark" label="Dark" fxLayout="column"></siat-button>
    </siat-column>
  </siat-body-card>`;

  buttonOutline: string = `
  <siat-body-card>
    <siat-wrap>
      <siat-button color="btn-outline-primary" label="Primary"></siat-button>
      <siat-button color="btn-outline-secondary" label="Secondary"></siat-button>
      <siat-button color="btn-outline-success" label="Success"></siat-button>
      <siat-button color="btn-outline-info" label="Info"></siat-button>
      <siat-button color="btn-outline-warning" label="Warning"></siat-button>
      <siat-button color="btn-outline-danger" label="Danger"></siat-button>
      <siat-button color="btn-outline-light" label="Light"></siat-button>
      <siat-button color="btn-outline-dark" label="Dark"></siat-button>
    </siat-wrap>
  </siat-body-card>`;

  buttonCircle: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="15px">
      <div class="button-group">
        <siat-button-circle color="primary" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="secondary" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="success" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="info" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="warning" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="danger" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="light" icon="fa fa-home"></siat-button-circle>
      </div>
    </siat-column>
  </siat-body-card>`;

  buttonCircleLarge: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="15px">
      <div class="button-group">
        <siat-button-circle color="primary" size="btn-lg" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="secondary" size="btn-lg" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="success" size="btn-lg" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="info" size="btn-lg" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="warning" size="btn-lg" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="danger" size="btn-lg" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="light" size="btn-lg" icon="fa fa-home"></siat-button-circle>
      </div>
    </siat-column>
  </siat-body-card>`;

  buttonCircleExtraLarge: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="15px">
      <div class="button-group">
        <siat-button-circle color="primary" size="btn-xl" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="secondary" size="btn-xl" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="success" size="btn-xl" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="info" size="btn-xl" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="warning" size="btn-xl" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="danger" size="btn-xl" icon="fa fa-home"></siat-button-circle>
        <siat-button-circle color="light" size="btn-xl" icon="fa fa-home"></siat-button-circle>
      </div>
    </siat-column>
  </siat-body-card>`;

  buttonCircleLight: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="15px">
      <div class="button-group">
        <siat-button-circle-light color="primary" icon="fa fa-home"> </siat-button-circle-light>
        <siat-button-circle-light color="secondary" icon="fa fa-home"> </siat-button-circle-light>
        <siat-button-circle-light color="success" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="info" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="warning" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="danger" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="light" icon="fa fa-home"></siat-button-circle-light>
      </div>
    </siat-column>
  </siat-body-card>`;

  buttonCircleLightLarge: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="15px">
      <div class="button-group">
        <siat-button-circle-light color="primary" size="btn-lg" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="secondary" size="btn-lg" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="success" size="btn-lg" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="info" size="btn-lg" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="warning" size="btn-lg" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="danger" size="btn-lg" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="light" size="btn-lg" icon="fa fa-home"></siat-button-circle-light>
      </div>
    </siat-column>
  </siat-body-card>`;

  buttonCircleLightExtraLarge: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="15px">
      <div class="button-group">
        <siat-button-circle-light color="primary" size="btn-xl" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="secondary" size="btn-xl" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="success" size="btn-xl" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="info" size="btn-xl" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="warning" size="btn-xl" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="danger" size="btn-xl" icon="fa fa-home"></siat-button-circle-light>
        <siat-button-circle-light color="light" size="btn-xl" icon="fa fa-home"></siat-button-circle-light>
      </div>
    </siat-column>
  </siat-body-card>`;

  buttonIcon: string = `
  <siat-body-card>
    <siat-wrap>
      <siat-button-rounded color="btn-primary" icon="fa fa-home"><span class="fw-bold">Primary</span></siat-button-rounded>
      <siat-button-rounded color="btn-outline-primary" icon="fa fa-home"><span class="fw-bold">Primary</span></siat-button-rounded>
      <siat-button color="btn-primary" icon="fa fa-home"><span class="fw-bold">Primary</span></siat-button>
      <siat-button color="btn-outline-primary" icon="fa fa-home"><span class="fw-bold">Primary</span></siat-button>
    </siat-wrap>
  </siat-body-card>`;

  buttonToggle: string = `
  <siat-body-card>
    <mat-button-toggle-group (change)="accionToggle($event)" value="614" fxLayout="row" fxLayoutGap="10px">
      <siat-button-toggle value="614" label="Propio"></siat-button-toggle>
      <siat-button-toggle value="615" label="Proveedor"></siat-button-toggle>
      <siat-button-toggle value="616" label="mix"></siat-button-toggle>
    </mat-button-toggle-group>
  </siat-body-card>`;

  buttonLink: string = `
  <siat-body-card>
    <siat-column fxLayoutGap="15px">
      <siat-row fxLayoutGap="30px">
        <siat-button-link>
          <siat-fa-icon size="30px" color="#002B5E" icon="fa fa-home"></siat-fa-icon>
        </siat-button-link>
        <siat-button-link>
          <siat-fa-icon size="30px" color="#005B9E" icon="fa fa-user"></siat-fa-icon>
        </siat-button-link>
      </siat-row>
      <siat-row fxLayoutGap="30px">
        <siat-button-link>
          Ver pruebas
        </siat-button-link>
        <siat-button-link>
          Iniciar pruebas
        </siat-button-link>
      </siat-row>                
    </siat-column>
  </siat-body-card>`;

  buttonIconLink: string = `
  <siat-body-card>
    <siat-row>
      <siat-icon-link icon="fa fa-home"></siat-icon-link>
      <siat-icon-link icon="fa fa-user"></siat-icon-link>
      <siat-icon-link icon="fa fa-home"></siat-icon-link>
    </siat-row>
  </siat-body-card>`;
    
  constructor() { }

  ngOnInit(): void {
  }

  accionToggle(evt:any) {
    console.log("VALUE toggle ", evt);
  }

}
