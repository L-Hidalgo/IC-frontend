import { Injectable } from '@angular/core';
import { AppContextService, DatosAuthServerService, SesionService } from 'core-lib';
import { DatosAuthLocalService } from './datos-auth-local.service';

@Injectable({
  providedIn: 'root'
})
export class UseCaseContextService extends AppContextService{

  /**
   * DatosAuthServerService   --> se utiliza para ejecutar la aplicación en modo PRODUCCION  
   * DatosAuthLocalService    --> se utiliza para ejecutar la aplicación en modo LOCAL
   * 
   * Cargar clasificadores y otros transversales
   */
  constructor(private datosAuthService: DatosAuthLocalService, private sesionService:SesionService) {
    super();    
    sesionService.setDatosAuthService(datosAuthService);
  }

  obtenerDatos(): void {
    this.datosAuthService.obtenerDatos();
  }


/*   async obtenerClasificadores() {
    const response: RespuestaLista<TipoClasificador> = await this.getFetch('http://localhost:8080/rest/clasificadores');
    if (response.transaccion) {
      this.setDataList(response.objetosList as TipoClasificador[]);
    }
  }
 */
}
