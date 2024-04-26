import { Persona } from "./persona";
import { Departamento } from "./departamento";

export interface Puesto {
  idPuesto: number;
  itemPuesto?: number;
  denominacionPuesto?: string;
  salarioPuesto?: number;
  salarioLiteralPuesto?: string;
  objetivoPuesto?: string;
  estadoId?: number;
  departamentoId?: number;
  personaActualId?: number;
  personaActual?: Pick< Persona,| 'idPersona'| 'nombrePersona' | 'primerApellidoPersona'| 'segundoApellidoPersona'>;
  departamento?: Pick< Departamento, "idDepartamento" | "nombreDepartamento" | "gerencia">;
  createdAt: string;
  updatedAt: string;
  fechaInicio?: string | null;
  fechaFin?: string | null;
}
