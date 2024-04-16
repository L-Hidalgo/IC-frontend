import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts-page',
  templateUrl: './alerts-page.component.html',
  styleUrls: ['./alerts-page.component.css']
})
export class AlertsPageComponent implements OnInit {

  alert: string = `
<siat-column padding="20px">
  <siat-alert type="primary" text="Something happened"></siat-alert>
  <siat-alert type="secondary" text="Something happened"></siat-alert>
  <siat-alert type="success" text="Something happened"></siat-alert>
  <siat-alert type="info" text="Something happened"></siat-alert>
  <siat-alert type="warning" text="Something happened"></siat-alert>
  <siat-alert type="danger" text="Something happened"></siat-alert>
</siat-column>`;

  alertLight: string = `
<siat-column padding="20px">
  <siat-alert-light type="primary" text="Something happened"></siat-alert-light>
  <siat-alert-light type="secondary" text="Something happened"></siat-alert-light>
  <siat-alert-light type="success" text="Something happened"></siat-alert-light>
  <siat-alert-light type="info" text="Something happened"></siat-alert-light>
  <siat-alert-light type="warning" text="Something happened"></siat-alert-light>
  <siat-alert-light type="danger" text="Something happened"></siat-alert-light>
</siat-column>`;

  constructor() { }

  ngOnInit(): void {
  }

}
