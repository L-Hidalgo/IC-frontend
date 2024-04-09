import { Mensaje } from "./mensaje";

export interface Respuesta {
    transaccion: boolean;
    mensajes: Mensaje[];
}

export interface RespuestaObjeto<T> extends Respuesta {
    objeto?: T;
}

export interface RespuestaLista<T> extends Respuesta {
    objetosList?: T[];
}

export interface RespuestaMap<T> extends Respuesta {
    objetos?: Record<string, any>;
}

