export interface Opcion {
    id: number;
    nombre: string;
    descripcion: string;
    opcionOrigenId: number,
    tipoOpcionId: number,
    tipoAplicacionId: number,
    aplicacionId: number,
    subsistemaId: number,
    estadoOpcionId: number,
    link: string,
    icono: string,
    subOpcionesList: Opcion[],
}

export interface RolOpcion {
    rolId: number;
    opcionId: number;
}