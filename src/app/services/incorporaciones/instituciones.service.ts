import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiIcBackUrl } from '../../utils/ApiURL';
import { RespuestaLista, RespuestaObjeto } from 'src/app/models/respuesta';
import { Institucion } from './../../models/incorporaciones/institucion';

@Injectable({
  providedIn: 'root'
})
export class InstitucionesService {
  private baseUrl = apiIcBackUrl;
  private path = 'api/instituciones';

  constructor(private http: HttpClient) { }

  createInstitucion(data: Partial<Institucion>) {
    return this.http.post<RespuestaObjeto<Institucion>>(`${this.baseUrl}/${this.path}`, data);
  }

  getAll() {
    return this.http.get<RespuestaLista<Institucion>>(`${this.baseUrl}/${this.path}`);
  }
  
  getByName(name: string) {
    return this.http.post<RespuestaObjeto<Institucion>>(`${this.baseUrl}/${this.path}/by-name`, {
      nombreInstitucion: name,
    });
  }
  
}
