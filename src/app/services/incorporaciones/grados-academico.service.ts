import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiIcBackUrl } from '../../utils/ApiURL';
import { RespuestaLista, RespuestaObjeto } from 'src/app/models/respuesta';
import { GradoAcademico } from 'src/app/models/incorporaciones/grado-academico';

@Injectable({
  providedIn: 'root'
})
export class GradosAcademicoService {
  private baseUrl = apiIcBackUrl;
  private path = 'api/grados-academico';

  constructor(private http: HttpClient) { }

  createGradoAcademico(data: Partial<GradoAcademico>) {
    return this.http.post<RespuestaObjeto<GradoAcademico>>(`${this.baseUrl}/${this.path}`, data);
  }

  getAll() {
    return this.http.get<RespuestaLista<GradoAcademico>>(`${this.baseUrl}/${this.path}`);
  }
  
  getByName(name: string) {
    return this.http.post<RespuestaObjeto<GradoAcademico>>(`${this.baseUrl}/${this.path}/by-name`, {
      nombreGradoAcademico: name,
    });
  }
  
}
