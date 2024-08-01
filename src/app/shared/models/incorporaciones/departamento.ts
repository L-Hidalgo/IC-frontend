import { Gerencia } from "./gerencia";

export interface Departamento {
    idDepartamento: number;
    nombreDepartamento?: string;
    gerencia?: Pick<Gerencia, 'idGerencia' | 'nombreGerencia'>;
    createdAt: string;
    updatedAt: string;
    fechaInicio?: string | null;
    fechaFin?: string | null;
    selected: boolean
}
