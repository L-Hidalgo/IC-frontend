import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { RespuestaLista, RespuestaObjeto } from 'src/app/shared/models/respuesta';
import { GradoAcademico } from 'src/app/shared/models/incorporaciones/grado-academico';

@Injectable({
  providedIn: 'root'
})
export class GradosAcademicoService {
  private baseUrl = environment.apiIcBack;
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
