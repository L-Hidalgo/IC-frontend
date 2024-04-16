import { Injectable } from '@angular/core';
import { DialogService, getAmbiente, MensajesService, ModelService, ModelServiceToken, SesionService } from 'core-lib';
// import { Mensaje } from '../models/mensaje';
import { ObtenerFechaURL } from '../utils/ApiURL';
@Injectable({
  providedIn: 'root'
})
export class RestService extends ModelServiceToken<string>{

  constructor(private sesionService:SesionService, private dialogService: DialogService) {
    super(sesionService);
    // super();
  }

  async getConnection() {
    try {
      const respuesta = await this.getFetch(ObtenerFechaURL +'/rest/obtenerFecha');
      this.setDataModel(respuesta);
    } catch (error: any) {
      this.dialogService.setRespuesta({
        transaccion: false,
        mensajes: [
          {
              codigo: 0,
              descripcion: JSON.stringify(error.message) 
          }
        ]
      });
    }
  }

  /**
   * Este metodo habilita el envio del token
   */
  /* override getAccesToken(){
    return this.sesionService.getAccesToken();
  } */

}
