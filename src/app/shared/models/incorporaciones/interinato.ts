import { Persona } from "./persona";
import { Puesto } from "./puesto";
import { User } from "./user";

export interface Interinato {
  idInterinato: number;
  
  proveidoTramiteInterinato?: string;
  citeNotaInformeMinutaInterinato?: string;
  fchCiteNotaInfMinutaInterinato?: Date | null;
  puestoNuevoId?: number;
  titularPuestoNuevoId?: number | null;
  puestoActualId?: number;
  titularPuestoActualId?: number | null;

  citeInformeInterinato?: string;
  fojasInformeInterinato?: string;
  citeMemorandumInterinato?: string;
  codigoMemorandumInterinato?: string;
  citeRapInterinato?: string;
  codigoRapInterinato?: string;
  fchMemorandumRapInterinato?: Date | null;

  fchInicioInterinato?: Date;
  fchFinInterinato?: Date;
  totalDiasInterinato?: number | null;
  periodoInterinato?: string;
  tipoNotaInformeMinutaInterinato?: string;
  sayriInterinato?: string;
  observacionesInterinato?: string;
  
  createdBy?: number | null;
  modifiedBy?: number | null;

  puestoActual?: Pick<Puesto, "idPuesto" | "itemPuesto" | "denominacionPuesto" | "departamento">;
  puestoNuevo?: Pick<Puesto, "idPuesto" | "itemPuesto" | "denominacionPuesto" | "departamento">;
  personaNuevo?: Pick<Persona, | "idPersona" | "primerApellidoPersona" | "segundoApellidoPersona" | "nombrePersona" | "ciPersona" | "generoPersona">;
  personaActual?: Pick<Persona, | "idPersona" | "primerApellidoPersona" | "segundoApellidoPersona" | "nombrePersona" | "ciPersona" | "generoPersona">;
  usuarioCreador?: Pick<User, "id" | "name" | "username">;
  usuarioModificador?: Pick<User, "id" | "name" | "username">;
}


