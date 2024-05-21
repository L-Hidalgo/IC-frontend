import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { RespuestaObjeto } from 'src/app/shared/models/respuesta';
import { Formacion } from 'src/app/shared/models/incorporaciones/formacion';

@Injectable({
  providedIn: 'root'
})
export class FormacionesService {
  private baseUrl = environment.apiIcBack; 
  private path = 'api/formaciones';

  constructor(private http: HttpClient) { }

  buscarPorPersonaId(personaId: number) {
    return this.http.get<RespuestaObjeto<Formacion>>(`${this.baseUrl}/${this.path}/${personaId}/by-persona-id`);
  }

  createUpdateFormacion(data: Partial<Formacion>) {
    return this.http.put<RespuestaObjeto<Formacion>>(`${this.baseUrl}/${this.path}`, data);
  }
}
