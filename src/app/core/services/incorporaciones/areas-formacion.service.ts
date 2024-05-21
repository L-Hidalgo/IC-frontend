import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { RespuestaLista, RespuestaObjeto } from 'src/app/shared/models/respuesta';
import { AreaFormacion } from 'src/app/shared/models/incorporaciones/area-formacion';

@Injectable({
  providedIn: 'root'
})
export class AreasFormacionService {
  private baseUrl = environment.apiIcBack;
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
