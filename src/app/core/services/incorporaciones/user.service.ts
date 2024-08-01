import { Injectable } from "@angular/core";
import { RespuestaLista } from "src/app/shared/models/respuesta";
import { RespuestaObjeto } from "src/app/shared/models/respuesta";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from "src/app/shared/models/incorporaciones/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = environment.apiIcBack;
  private path = "api/users";

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<RespuestaLista<User>>(`${this.baseUrl}/${this.path}`);
  }
  
  asignarRol(userId: number, roles: number[]) {
    return this.http.put<RespuestaObjeto<User>>(
      `${this.baseUrl}/${this.path}/updateRolUser/${userId}`,
     {roles}
    );
  }

  

}
