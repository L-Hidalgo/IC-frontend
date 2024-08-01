import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Interinato } from 'src/app/shared/models/incorporaciones/interinato';
import { RespuestaLista, RespuestaObjeto } from 'src/app/shared/models/respuesta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterinatoService {

  private baseUrl = environment.apiIcBack;
  private path = "api/interinatos";

  constructor(
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) { }

  getCurrentUserId(): number | null {
    const currentUser = this.authenticationService.getCurrentUser();
    return currentUser ? currentUser.id : null;
  }

  crearInterinato(interinatoData: Partial<Interinato>) {
    const userId = this.getCurrentUserId();
    if (userId) {
      interinatoData.createdBy = userId;

      return this.http.post<RespuestaObjeto<Interinato>>(
        `${this.baseUrl}/${this.path}`,
        interinatoData
      );
    } else {
      throw new Error("No se pudo obtener el ID del usuario actual");
    }
  }

  listarInterinatos(query?: string, pagination?: { page?: number; limit?: number }) {
    return this.http.post<RespuestaLista<Interinato>>(
       `${this.baseUrl}/${this.path}/listar-interinatos`,
      { query, ...pagination }
    );
  }

  byFiltrosInterinato( puestoPersona: string, pagination?: { page?: number; limit?: number }) {
    return this.http.post<RespuestaLista<any>>(
      `${this.baseUrl}/${this.path}/filtrar-interinato`,
      { puestoPersona, ...pagination }
    );
  }
 
}
