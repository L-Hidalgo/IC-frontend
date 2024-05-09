import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {
  //private baseUrl = 'http://localhost:8000/api'; 
  private baseUrl = 'http://10.1.4.8:8000/api'; 

  constructor(private http: HttpClient) { }

  uploadExcel(file: File) {
    const formData = new FormData();
    formData.append('archivoPlanilla', file, file.name); 

    return this.http.post(`${this.baseUrl}/planilla`, formData);
  }
}
