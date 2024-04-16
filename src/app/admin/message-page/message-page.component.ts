import { Component, OnInit } from '@angular/core';
import { DialogService } from 'core-lib';
@Component({
  selector: 'app-message-page',
  templateUrl: './message-page.component.html',
  styleUrls: ['./message-page.component.scss']
})
export class MessagePageComponent implements OnInit {

  alertMessage: string = `
  <siat-body-card>
    <siat-modal-message type="success" title="Opps" message="Desea imprimir registro?" [(model)]="success" (clickOk)="modalOk()" (clickCancel)="modalCancel()"></siat-modal-message>
    <siat-modal-message type="error" title="Error title"  [(model)]="error"></siat-modal-message>
    <siat-modal-message type="info" title="info title"  [(model)]="info"></siat-modal-message>
    <siat-modal-message type="warning" title="warning title"  [(model)]="warning"></siat-modal-message>
    <siat-wrap>
      <siat-button color="btn-outline-success" (click)="success = true" label="success "></siat-button>
      <siat-button color="btn-outline-danger" (click)="error = true" label="Error"> </siat-button>
      <siat-button color="btn-outline-info" (click)="info = true" label="info"></siat-button>
      <siat-button color="btn-outline-warning" (click)="warning = true" label="warning"></siat-button>
    </siat-wrap>
  </siat-body-card>`;

  dialogAlert: string = `
  <siat-body-card>
    <siat-wrap>
      <siat-button color="btn-success" label="Mostrar success" (onClick)="setMessage()"></siat-button>
      <siat-button color="btn-danger" label="Mostrar false" (onClick)="setFalseMessage()"></siat-button>
    </siat-wrap>
  </siat-body-card>`;

  loading: string = `
  <siat-body-card>
    <siat-block-ui [(loading)]="showLoading">
      Contenido
    </siat-block-ui>
    <div class="body-card">
      <button (click)="showLoading = true">open</button>
      <button (click)="showLoading = false">Close</button>
    </div>
  </siat-body-card>`;

  constructor(public dialogService:DialogService) { }

  ngOnInit(): void {
  }

  success: boolean = false;
  error: boolean = false;
  info:boolean = false;
  warning: boolean = false;
  showLoading: boolean = false;

  setMessage () {
    // this.mostrar = true;
    this.dialogService.setMensaje("Guardar Sistema", { transaccion: true, mensajes: [{codigo: 1, descripcion: 'algo'}, {codigo: 2, descripcion: '3234234234'}] });
  }

  setFalseMessage () {
    this.dialogService.setMensaje("Guardar Sistema", { transaccion: false, mensajes: [{codigo: 1, descripcion: 'algo'}, {codigo: 2, descripcion: '3234234234'}] });
  }

  modalOk () {
    console.log('OK');
  }

  modalCancel () {
    console.log('CANCEL');
  }

  showBlockUI () {
    this.showLoading = true;
  }

  hideBlockUI () {
    this.showLoading = false;
  }
}
