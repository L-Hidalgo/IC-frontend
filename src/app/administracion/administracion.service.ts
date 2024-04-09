import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  private baseUrl = 'http://localhost:8000/api'; // Cambia por la URL de tu backend

  constructor(private http: HttpClient) { }

  uploadExcel(file: File) {
    const formData = new FormData();
    formData.append('archivoPlanilla', file, file.name); // Asegúrate de que 'archivoPlanilla' coincida con el nombre de la clave esperada en el backend

    return this.http.post(`${this.baseUrl}/planilla`, formData);
  }
}
