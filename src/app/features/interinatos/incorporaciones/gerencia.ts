import { Departamento } from "./departamento";

export interface Gerencia {
  idGerencia: number;
  nombreGerencia?: string;
  createdAt: string;
  updatedAt: string;
  fechaInicio?: string | null;
  fechaFin?: string | null;

  selected: boolean; // Añadir la propiedad selected de tipo boolean
  departamentos: Departamento[];
}
