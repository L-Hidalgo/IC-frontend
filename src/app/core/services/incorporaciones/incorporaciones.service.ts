import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { RespuestaLista, RespuestaObjeto } from 'src/app/shared/models/respuesta';
import { Incorporacion } from 'src/app/shared/models/incorporaciones/incorporacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncorporacionesService {
  private baseUrl = environment.apiIcBack;
  private path = 'api/incorporaciones';

  constructor(private http: HttpClient) { }

  createUpdateIncorporacion(incorporacionData: Partial<Incorporacion>) {
    return this.http.put<RespuestaObjeto<Incorporacion>>(`${this.baseUrl}/${this.path}`, incorporacionData);
  }

  listar(query?: string, pagination?: {page?: number, limit?: number}) {
    return this.http.post<RespuestaLista<Incorporacion>>(`${this.baseUrl}/${this.path}/list`, {query, ...pagination});
  }

  buscarNombrePersona(nombreCompletoPersona: string) {
    return this.http.post<RespuestaLista<Incorporacion>>(
      `${this.baseUrl}/${this.path}/byNombreCompletoPersonaIncorporacion`,{ nombreCompletoPersona }
    );
  }

  /*buscarNombreUser(nombreCompletoUser: string) {
    return this.http.post<RespuestaLista<Incorporacion>>(
      `${this.baseUrl}/${this.path}/byNombreCompletoUserIncorporacion`,{ nombreCompletoUser }
    );
  }*/

  generarFormularioEvalR0078(incorporacionId: number) {
    return this.http.post<RespuestaObjeto<Incorporacion>>(`${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-evalR0078`,{});
  }

  genUrlFormularioEvalR0078(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-evalR0078`;
  }

  genUrlFormularioEvalR1401(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-evalR1401`;
  }

  genUrlInfNota(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-informe-con-nota`;
  }

  genUrlInfMinuta(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-informe-con-minuta`;
  }

  genUrlMemo(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-memo`;
  }

  genUrlRAP(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-RAP`;
  }

  genUrlActEntrega(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-acta-de-entrega`;
  }

  genUrlActPosecion(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-acta-de-posesion`;
  }

  genUrlR0716(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-etica`;
  }

  genUrlR0921(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-declaracion-incompatibilidad`;
  }

  genUrlR0976(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-compromiso`;
  }

  genUrlRSGC0033(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-confidencialidad`;
  }
  //form cambio item
  genUrlR0980(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-R-0980`;
  }

  genUrlR1023(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-R-1023`;
  }

  genUrlR1129(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-R-1129`;
  }

  genUrlR1401(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-R-1401`;
  }
}
