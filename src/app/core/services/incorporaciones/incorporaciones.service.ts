import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import {
  RespuestaLista,
  RespuestaObjeto,
} from "src/app/shared/models/respuesta";
import { Incorporacion } from "src/app/shared/models/incorporaciones/incorporacion";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IncorporacionesService {
  private baseUrl = environment.apiIcBack;
  private path = "api/incorporaciones";

  constructor(private http: HttpClient) {}

  createUpdateIncorporacion(incorporacionData: Partial<Incorporacion>) {
    return this.http.put<RespuestaObjeto<Incorporacion>>(
      `${this.baseUrl}/${this.path}`,
      incorporacionData
    );
  }

  listar(query?: string, pagination?: { page?: number; limit?: number }) {
    return this.http.post<RespuestaLista<Incorporacion>>(
      `${this.baseUrl}/${this.path}/list`,
      { query, ...pagination }
    );
  }

  byFiltrosIncorporacion( name: string, nombreCompletoPersona: string, tipo: string, fechaInicio: string, fechaFin: string) {
    return this.http.post<RespuestaLista<Incorporacion>>(
      `${this.baseUrl}/${this.path}/byFiltrosIncorporacion`,
      { name, nombreCompletoPersona, tipo, fechaInicio, fechaFin }
    );
  }

  darBajaIncorporacion(incorporacionId: number): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${this.path}/${incorporacionId}/darBajaIncorporacion`,
      {}
    );
  }


  generarReportEvaluacion(name: string, fechaInicio: string, fechaFin: string) {
    return this.http.post<Blob>(
      `${this.baseUrl}/${this.path}/genReportEval`,
      { name, fechaInicio, fechaFin },
      { responseType: 'blob' as 'json' } 
    );
  }

  generarReportTrimestral(name: string, fechaInicio: string, fechaFin: string) {
    return this.http.post<Blob>(
      `${this.baseUrl}/${this.path}/genReportTrimestral`,
      { name, fechaInicio, fechaFin },
      { responseType: 'blob' as 'json' } 
    );
  }

  genUrlInfMinuta(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-inf-minuta`;
  }

  genUrlInfNota(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-inf-nota`;
  }

  genUrlMemo(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-memo`;
  }

  genUrlRap(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-rap`;
  }

  genUrlActEntrega(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-acta-entrega`;
  }

  genUrlActPosecion(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-acta-posesion`;
  }

  genUrlR0980(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-R0980`;
  }

  //formularios de incorporacion
  genUrlR0078(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-R0078`;
  }

  genUrlR1401(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-R1401`;
  }

  //formularios de cambio item
  genUrlR1023(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-R1023`;
  }

  genUrlR1129(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-form-R1129`;
  }

  // otros formularios de incorporacion
  genUrlR0716(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-R0716`; 
  }

  genUrlR0921(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-R0921`;
  }

  genUrlR0976(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-R0976`;
  }

  genUrlRSGC0033(incorporacionId: number) {
    return `${this.baseUrl}/${this.path}/${incorporacionId}/gen-RSGC-0033`; //genFormConfidencialidad
  }
 
  //servicio para mostrar las imagenes de una persona
  obtenerImagenPersona(personaId: number): string {
    return `${this.baseUrl}/${this.path}/imagen-persona/${personaId}`;
  }

}
