import { Persona } from "./persona";
import { Departamento } from "./departamento";
import { Incorporacion } from "./incorporacion";
import { User } from "./user";

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
  createdAt: string;
  updatedAt: string;
  fechaInicio?: string | null;
  fechaFin?: string | null;

  incorporaciones?: Incorporacion[]; 
  user?: Pick<User, 'id' | 'name' | 'username'>;
  personaActual?: Pick< Persona,| 'idPersona'| 'nombrePersona' | 'primerApellidoPersona'| 'segundoApellidoPersona' | 'ciPersona' | 'generoPersona'>;
  departamento?: Pick< Departamento, "idDepartamento" | "nombreDepartamento" | "gerencia">;
}
