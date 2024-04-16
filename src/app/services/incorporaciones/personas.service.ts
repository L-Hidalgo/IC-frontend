import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiIcBackUrl } from '../../utils/ApiURL';
import { RespuestaObjeto } from 'src/app/models/respuesta';
import { Persona } from 'src/app/models/incorporaciones/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private baseUrl = apiIcBackUrl;
  private path = 'api/personas';

  constructor(private http: HttpClient) { }

  createUpdatePersona(personaData: Partial<Persona>) {
    return this.http.put<RespuestaObjeto<Persona>>(`${this.baseUrl}/${this.path}`, personaData);
  }

  fingByCi(ci: string) {
    return this.http.get<RespuestaObjeto<Persona>>(`${this.baseUrl}/${this.path}/${ci}/by-ci`);
  }
  
  fingById(idPersona: number) {
    return this.http.get<RespuestaObjeto<Persona>>(`${this.baseUrl}/${this.path}/${idPersona}`);
  }
}
