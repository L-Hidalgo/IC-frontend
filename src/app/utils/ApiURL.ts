// ################ API CONFIG ################

import { getAmbiente } from "core-lib";
import { environment } from "src/environments/environment";

// dominio = desa....cali...
export const domain = getAmbiente();

export const ObtenerFechaURL = domain + environment.api;


export const apiIcBackUrl = domain + environment.apiIcBack;

