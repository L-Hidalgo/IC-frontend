import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { RespuestaObjeto } from "src/app/shared/models/respuesta";
import { Observable } from "rxjs";
import { RespuestaLista } from "src/app/shared/models/respuesta";
import { User } from "src/app/shared/models/incorporaciones/user";

@Injectable({
  providedIn: "root",
})
export class AdministracionService {
  private baseUrl = environment.apiIcBack;
  private path = "api/administracion";

  constructor(private http: HttpClient) {}

  uploadExcel(archivoPlanilla: File) {
    const formData = new FormData();
    formData.append("archivoPlanilla", archivoPlanilla);

    return this.http.post<RespuestaObjeto<string>>(
      `${this.baseUrl}/${this.path}/import-planilla`,
      formData
    );
  }

  uploadZip(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<RespuestaObjeto<string>>(
      `${this.baseUrl}/${this.path}/import-imagenes`,
      formData
    );
  }

  imagenUser(personaCi: string): Observable<Blob> {
    return this.http.get(
      `${this.baseUrl}/${this.path}/imagen-user/${personaCi}`,
      { responseType: "blob" }
    );
  }

  getPuestoDetalle() {
    return this.http.get(`${this.baseUrl}/${this.path}/puestoDetalle`, {});
  }

  getIncorporacionDetalle() {
    return this.http.get(
      `${this.baseUrl}/${this.path}/incorporacionDetalle`,
      {}
    );
  }
  //----------------------------------------------------------------------------------------------------------------------------
  listarUsuarios(query?: string, pagination?: { page?: number; limit?: number }) {
    return this.http.post<RespuestaLista<User>>(
       `${this.baseUrl}/${this.path}/listar-usuarios`,
      { query, ...pagination }
    );
  }

  byNombreUsuario(name: string, pagination?: { page?: number; limit?: number }) {
    return this.http.post<RespuestaLista<User>>(
      `${this.baseUrl}/${this.path}/filtrar-nombre-usuario`, 
      { name, ...pagination } 
    );
  }
}
