// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// import { DataServiceConfig } from "str-auth-lib";
export const environment = {
  production: false,
  environmentName: "desarrollo",
  api: 'https://desasiatservicios.impuestos.gob.bo/sen-safe-launcher-rest',
  apiIcBack: 'http://localhost:8000',
  //apiIcBack: 'http://10.1.4.8:8000',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
/* export const keycloakConfig:DataServiceConfig = {
  url:'https://desalogin.impuestos.gob.bo',
  realm:'SIAT',
  clientId:'app-ang-frontend'
}; */

/* export const keycloakConfig:DataServiceConfig = {
    url: 'https://desalogin.impuestos.gob.bo',
    realm: 'login',
    clientId: 'app-frontend'
};
   */