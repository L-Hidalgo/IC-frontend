import { Injectable } from '@angular/core';
import { Mensaje } from '../models/mensaje';
import { Respuesta } from '../models/respuesta';
import { ModelService } from './model.service';

@Injectable({
  providedIn: 'root'
})
export class MensajesService extends ModelService<Mensaje>{

  private advertencias: boolean = false;

  constructor() {
    super();
  }

  public setAdvertencias(value: boolean): void {
    this.advertencias = value;
  }

  public getAdvertencias(): boolean {
    return this.advertencias;
  }

  public setRespuesta(respuesta: Respuesta) {
    this.setAdvertencias(!respuesta.transaccion);
    this.setDataList(respuesta.mensajes);
  }

  public setMensaje(accion: string, respuesta: Respuesta) {
    this.setDataModel({ codigo: -1, descripcion: accion });
    this.setRespuesta(respuesta);
  }

  protected override createDefault(): Mensaje {
    return {};
  }

}
