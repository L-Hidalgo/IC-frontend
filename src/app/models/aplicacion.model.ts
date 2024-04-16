import { Respuesta } from "./respuesta";

export interface Aplicacion extends Respuesta {
    id?: number;
    nombre?: string;
    descripcion?: string;
    url?: string;
    subAplicacionesList?: Aplicacion[];
}


export interface RolAplicacion{
    rolId?: number;
    aplicacionId?: number;
}