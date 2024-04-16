import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiIcBackUrl } from '../../utils/ApiURL';
import { RespuestaObjeto } from 'src/app/models/respuesta';
import { Formacion } from 'src/app/models/incorporaciones/formacion';

@Injectable({
  providedIn: 'root'
})
export class FormacionesService {
  private baseUrl = apiIcBackUrl; 
  private path = 'api/formaciones';

  constructor(private http: HttpClient) { }

  buscarPorPersonaId(personaId: number) {
    return this.http.get<RespuestaObjeto<Formacion>>(`${this.baseUrl}/${this.path}/${personaId}/by-persona-id`);
  }

  createUpdateFormacion(data: Partial<Formacion>) {
    return this.http.put<RespuestaObjeto<Formacion>>(`${this.baseUrl}/${this.path}`, data);
  }
}
