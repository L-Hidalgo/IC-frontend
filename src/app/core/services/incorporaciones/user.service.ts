import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { User } from 'src/app/shared/models/incorporaciones/user';
import { RespuestaLista } from 'src/app/shared/models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiIcBack; 
  private path = 'api/users';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<RespuestaLista<User>>(`${this.baseUrl}/${this.path}`);
  }
}
