import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { RespuestaLista } from "src/app/shared/models/respuesta";
import { Rol } from "src/app/shared/models/incorporaciones/rol";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RolesService {
  private baseUrl = environment.apiIcBack;
  private path = "api/users";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<RespuestaLista<Rol>>(
      `${this.baseUrl}/${this.path}/listarRol`
    );
  }

  getUserRoles(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/${this.path}/${userId}/listarUserRol`);
  }
}
