import { Persona } from "../models/incorporaciones/persona";
import { Puesto } from "../models/incorporaciones/puesto";

export interface Incorporacion {
  idIncorporacion?: number;
  puestoNuevoId?: number | null;
  puestoNuevoItem?: number;
  puestoActualId?: number;
  puestoActualItem?: number;
  personaId?: number | null;
  conRespaldoFormacion?: number | null;
  observacionIncorporacion?: string |null;
  fchIncorporacion?: string;
  estadoIncorporacion?: number | null;
  // Requisitos puestos
  cumpleExpProfesionalIncorporacion?: number; 
  cumpleExpEspecificaIncorporacion?: number; 
  cumpleExpMandoIncorporacion?: number; 
  cumpleFormacionIncorporacion?: number; 
  // notas y citesp
  citeNotaMinutaIncorporacion?: string | null;
  codigoNotaMinutaIncorporacion?: string | null;
  fchNotaMinutaIncorporacion?: Date | null;
  fchRecepcionNotaIncorporacion?: Date | null;

  citeInformeIncorporacion?: string | null;
  fchInformeIncorporacion?: Date | null;

  citeMemorandumIncorporacion?: string | null;
  codigoMemorandumIncorporacion?: string | null;
  fchMemorandumIncorporacion?: Date | null;

  citeRapIncorporacion?: string | null;
  codigoRapIncorporacion?: string | null;
  fchRapIncorporacion?: Date | null;

  hpIncorporacion?: string | null;
  // Relaciones
  persona?: Pick<Persona, 'idPersona' | 'primerApellidoPersona' | 'segundoApellidoPersona' | 'nombrePersona' | 'ciPersona' | 'generoPersona'>;
  puestoActual?: Pick<Puesto, 'idPuesto' | 'itemPuesto' | 'denominacionPuesto' | "departamento">;
  puestoNuevo?: Pick<Puesto, "idPuesto" | "itemPuesto" | "denominacionPuesto" | "departamento">;
}

export enum EstadosIncorporacion {
  SIN_REGISTRO = 1,
  CON_REGISTRO = 2,
  FINALIZADO = 3,
  INACTIVO = 4,
}

