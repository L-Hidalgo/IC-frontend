import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiIcBackUrl } from '../../utils/ApiURL';
import { RespuestaLista, RespuestaObjeto } from 'src/app/models/respuesta';
import { AreaFormacion } from 'src/app/models/incorporaciones/area-formacion';

@Injectable({
  providedIn: 'root'
})
export class AreasFormacionService {
  private baseUrl = apiIcBackUrl;
  private path = 'api/areas-formacion';

  constructor(private http: HttpClient) { }

  createAreaFormacion(data: Partial<AreaFormacion>) {
    return this.http.post<RespuestaObjeto<AreaFormacion>>(`${this.baseUrl}/${this.path}`, data);
  }

  getAll() {
    return this.http.get<RespuestaLista<AreaFormacion>>(`${this.baseUrl}/${this.path}`);
  }
  
  getByName(name: string) {
    return this.http.post<RespuestaObjeto<AreaFormacion>>(`${this.baseUrl}/${this.path}/by-name`, {
      nombreAreaFormacion: name,
    });
  }
  
}
