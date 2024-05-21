export interface Solicitud {
    nit?: number;
}

export interface SolicitudObjeto<T> extends Solicitud {
    parametro?: T;
}

export interface SolicitudLista<T> extends Solicitud {
    parametrosList?: T[];
}

export interface SolicitudMap extends Solicitud {
    parametros?: Record<string, any>;
}