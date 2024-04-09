import { Injectable } from '@angular/core';
import { ModelService } from 'core-lib';
import { Mensaje } from '../models/mensaje';
import { Respuesta } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class DialogService extends ModelService<Mensaje> {

  constructor() {
      super();
  }

  private advertencias: boolean = false;

/*   protected override createDefault(): ToastMessage {
    return {type:'info'} as ToastMessage;
    let resp : Respuesta
  } */

  public getAdvertencias(): boolean {
    return this.advertencias;
  }

  public setAdvertencias(value: boolean): void {
    this.advertencias = value;
  }

  public setRespuesta(respuesta: Respuesta) {
    this.setAdvertencias(!respuesta.transaccion);
    this.setDataList(respuesta.mensajes);
  }

  public setMensaje(accion: string, respuesta: Respuesta) {
    this.setDataModel({ codigo: -1, descripcion: accion });
    this.setRespuesta(respuesta);
  }

  // this._mensajesService.setMensaje("Guardar Sistema", { transaccion: false, mensajes: [] });
}