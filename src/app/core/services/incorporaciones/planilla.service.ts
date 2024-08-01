import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { RespuestaLista} from "src/app/shared/models/respuesta";
import { Observable } from 'rxjs';
import { Gerencia } from "src/app/shared/models/incorporaciones/gerencia";

@Injectable({
  providedIn: "root",
})
export class PlanillaService {
  private baseUrl = environment.apiIcBack;
  private path = "api/planilla";

  constructor(private http: HttpClient) {}

  listarPuestos(
    query?: string,
    pagination?: { page?: number; limit?: number }
  ) {
    return this.http.post<RespuestaLista<any>>(
      `${this.baseUrl}/${this.path}/listar-puestos`,
      { query, ...pagination }
    );
  }

  byFiltrosPlanilla( query?: any, pagination?: { page?: number; limit?: number }) {
    return this.http.post<RespuestaLista<any>>(
      `${this.baseUrl}/${this.path}/filtrar-puesto`,
      { query, ...pagination }
    );
  }

  getGerencias(): Observable<Gerencia[]> {
    return this.http.get<Gerencia[]>(
      `${this.baseUrl}/${this.path}/listar-gerencia`
    );
  }

  getImagenFuncionario(personaId: number): string {
    return `${this.baseUrl}/${this.path}/imagen-funcionario/${personaId}`;
  }

  getInfPersonaPuesto(puestoId: number) {
    return this.http.get<RespuestaLista<any>>(`${this.baseUrl}/${this.path}/${puestoId}`);
  }
}
