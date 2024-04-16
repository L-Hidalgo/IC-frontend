import { Injectable } from '@angular/core';
import { DatosAuthService, OpcionService, SesionService } from 'core-lib';

/**
 * Applicacion
 */

@Injectable({
  providedIn: 'root'
})
export class DatosAuthLocalService extends DatosAuthService {
 
  actualizarToken(): void {
   
  }
 
  cerrarSesion(): void {
   
  }

  constructor(private sesionService: SesionService, private opcionService: OpcionService) {
    super();
  }

  obtenerDatos(): void {
    this.sesionService.setDataModel({
      sessionId: 'sdf',
      accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJrWnl6bjQ1NTRucnJPbmozTUhSbm5NNktrbkhGMkUzUU5vT1FRVGh0OHE4In0.eyJleHAiOjE2Nzc4Njc1MDUsImlhdCI6MTY3Nzg2MzkwNSwianRpIjoiYTA1N2FkZDEtYjQwNi00ODQ0LWIyZjktMjk2MDk5NjAzODM3IiwiaXNzIjoiaHR0cHM6Ly9kZXNhbG9naW4uaW1wdWVzdG9zLmdvYi5iby9yZWFsbXMvbG9naW4iLCJzdWIiOiJkYjlmMDk0Ni0xYTg3LTRiYjEtYTFmMC0wODcwYWFmNmYzMjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcGktcmVzdC1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiY2YzN2QyZDYtNWFiZi00MTViLWE4MWMtY2MzYTMzZDgzMGM0IiwiYWNyIjoiMSIsInNjb3BlIjoic2lhdF9zY29wZSIsInNpZCI6ImNmMzdkMmQ2LTVhYmYtNDE1Yi1hODFjLWNjM2EzM2Q4MzBjNCIsInJvbGVzIjpbMTM3MiwxMzg3LDE0ODAsMTU0NiwxNTgyLDE1ODMsMTU4NCwxNjY0LDE2NjUsMTY5OF0sIm5pdCI6MTAwMzU3OTAyOCwibG9naW4iOiJvdGlsaWEyMzIxOCIsInVzdWFyaW9JZCI6NDc3MjQ1fQ.WGLYoKXIp8mmLgUouqTYelok_tNExuhJq7ldGoP11UO7y6eFYHYSdt_7kElEPNdDVYzRy1HbRQDCKwXtcSvWrrjRLHWhy1EdLwQKn3T44NYJCMFsaVw_75VMv1s2fCjNARosFh_q-ksi6685VfQBBzC6qk1F-pvjqdrRPTsAbuaQITHAWw978KOct_rwvqVMegRikeqU4OJpzF13LyTiue-ZuE9_e02iGqn4VOuQvERV_M4OOw4LrSBBjYsGbfpDUj37BbA_PqDzSk04rj6xYZ2NxrYYhBVvc4I2zVmAYOU3GQXi9DUuS-VHvQa0r3xv-E9f2tt8CO948Qh76CVNjQ',
      refreshToken: 'sdfd',
      roles: [9006, 1037, 1132, 1006, 4174, 4185],
      // roles: [1305, 1572],
      userInfo: {
        usuario: {
          login: "Siat-User",
          tipoUsuarioId: 100,
          tipoUsuarioDescripcion: 'Contribuyente',
        },
        contribuyente: {
          nit: 5115889019,
          razonSocial: 'VIGMAR CARLO',
          dependencia: 'TARIJA',
          ifc: 5454545,
        },
        persona: {
          nombres: 'VIGMAR JOSE',
          primerApellido: 'CARLO',
          segundoApellido: 'MORALES',
          nroDocumento: '5115889',
          tipoDocumento: 'CEDULA DE IDENTIDAD',
        },
        funcionario: {
          oficina: 'Los Pinos',
          dependencia: 'CENTRAL',
          cargo: 'Profesional E',
        },
      },
    });
/* 
    this.opcionService.setDataList([
      {
        nombre: 'Demos',
        subOpcionesList: [
          {
            nombre: 'Landing',
            icono: 'fa fa-window-restore',
            link: '/landing',
          },
          {
            nombre: 'Layouts',
            icono: 'fa-solid fa-layer-group',
            link: '/layouts',
          },
          {
            nombre: 'Outputs',
            icono: 'fa fa-sign-out',
            link: '/outputs',
          },
          {
            nombre: 'Cards',
            icono: 'fa fa-id-card',
            link: '/cards',
          },
          {
            nombre: 'Text',
            icono: 'fa fa-text-width',
            link: '/text',
          },
          {
            nombre: 'Inputs',
            icono: 'fa-solid fa-layer-group',
            link: '/inputs-validator',
          },
          {
            nombre: 'Listas',
            icono: 'fa fa-list',
            link: '/lists',
          },
          {
            nombre: 'Token service',
            icono: 'fa fa-refresh',
            link: '/read-token'
          },
          {
            nombre: 'Tablas',
            icono: 'fa fa-table',
            link: '/table',
          },
          {
            nombre: 'Utils',
            icono: 'fa-solid fa-tools',
            link: '/utils'
          }
        ],
      },
      {
        nombre: 'Admin',
        icono: 'fa fa-lock',
        subOpcionesList: [
          {
            nombre: 'Proveedores',
            icono: 'fa fa-tools',
            link: '/proveedores',
          }
        ]
      },
      {
        nombre: 'User',
        icono: 'fa fa-user',
        subOpcionesList: [
          {
            nombre: 'Contribuyente',
            icono: 'fa fa-search',
            link: '/sistemas',
          }
        ]
      }
    ]); */
  }


}
