import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiIcBackUrl } from '../../utils/ApiURL';
import { RespuestaObjeto } from 'src/app/models/respuesta';
import { Puesto } from 'src/app/models/incorporaciones/puesto';
import { Requisito } from 'src/app/models/incorporaciones/requisito';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {
  private baseUrl = apiIcBackUrl;
  private path = 'api/puestos';

  constructor(private http: HttpClient) { }

  findPuestoByItem(item: number) {
    return this.http.get<RespuestaObjeto<Puesto>>(`${this.baseUrl}/${this.path}/${item}/by-item`);
  }

  getPuestoRequisito(puestoId: number) {
    return this.http.get<RespuestaObjeto<Requisito>>(`${this.baseUrl}/${this.path}/${puestoId}/requisito`);
  }
}
