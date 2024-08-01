import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { RespuestaObjeto } from 'src/app/shared/models/respuesta';
import { Puesto } from 'src/app/shared/models/incorporaciones/puesto';
import { Requisito } from 'src/app/shared/models/incorporaciones/requisito';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {
  private baseUrl = environment.apiIcBack;
  private path = 'api/puestos';

  constructor(private http: HttpClient) { }

  byItem(item: number) {
    return this.http.get<RespuestaObjeto<Puesto>>(`${this.baseUrl}/${this.path}/${item}/by-item`);
  }

  byItemActual(item: number) {
    return this.http.get<RespuestaObjeto<Puesto>>(`${this.baseUrl}/${this.path}/${item}/by-item-actual`);
  }

  getPuestoRequisito(puestoId: number) {
    return this.http.get<RespuestaObjeto<Requisito>>(`${this.baseUrl}/${this.path}/${puestoId}/requisito`);
  }
}
