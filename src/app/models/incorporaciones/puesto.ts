import { Persona } from "./persona";


export interface Puesto {
  idPuesto: number;
  itemPuesto: number;
  denominacionPuesto?: string;
  salarioPuesto?: number;
  salarioLiteralPuesto?: string;
  objetivoPuesto?: string;
  estadoId?: number;
  departamentoId?: number;
  personaActualId?: number;
  personaActual?: Pick<
    Persona,
    | 'idPersona'
    | 'nombrePersona'
    | 'primerApellidoPersona'
    | 'segundoApellidoPersona'
  >;
  createdAt: string;
  updatedAt: string;
  fechaInicio?: string | null;
  fechaFin?: string | null;
}
