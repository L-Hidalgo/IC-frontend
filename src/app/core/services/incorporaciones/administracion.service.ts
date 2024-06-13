import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { RespuestaObjeto } from "src/app/shared/models/respuesta";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdministracionService {
  private baseUrl = environment.apiIcBack;
  private path = "api/administracion";

  constructor(private http: HttpClient) {}

  uploadZip(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return this.http.post<RespuestaObjeto<string>>(
      `${this.baseUrl}/${this.path}/importar-imagenes`,
      formData
    );
  }

  imagenUserPersona(personaCi: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${this.path}/imagen-user-persona/${personaCi}`, { responseType: 'blob' });
  }

  getPuestoDetalle() {
    return this.http.get(`${this.baseUrl}/${this.path}/puestoDetalle`, {});
  }

  getIncorporacionDetalle(gestion: number) {
    return this.http.get(`${this.baseUrl}/${this.path}/incorporacionDetalle/${gestion}`, {});
  }

  uploadExcel(archivoPlanilla: File) {
    const formData = new FormData();
    formData.append("archivoPlanilla", archivoPlanilla);

    return this.http.post<RespuestaObjeto<string>>(
      `${this.baseUrl}/${this.path}/planilla`,
      formData
    );
  }
}
