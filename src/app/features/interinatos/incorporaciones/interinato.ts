import { Persona } from "./persona";
import { Puesto } from "./puesto";
import { User } from "./user";

export interface Interinato {
  idInterinato: number;
  puestoNuevoId?: number;
  titularPuestoNuevoId?: number | null;
  puestoActualId?: number;
  titularPuestoActualId?: number | null;
  //Designacion
  proveidoTramiteInterinato?: string;
  citeNotaInformeMinutaInterinato?: string;
  fchCiteNotaInfMinutaInterinato?: Date | null;
  citeInformeInterinato?: string;
  fojasInformeInterinato?: string;
  citeMemorandumInterinato?: string;
  codigoMemorandumInterinato?: string;
  citeRapInterinato?: string;
  codigoRapInterinato?: string;
  fchMemorandumRapInterinato?: Date | null;
  fchInicioInterinato?: Date | null; 
  fchFinInterinato?: Date | null;
  totalDiasInterinato?: number | null;
  periodoInterinato?: string;
  tipoNotaInformeMinutaInterinato?: string;
  observacionesInterinato?: string;
  //Suspencion
  proveidoTramiteInterinatoSuspencion?: string;
  fchProveidoTramiteInterinatoSuspencion?: Date | null;
  citeMemorandumInterinatoSuspencion?: string;
  codigoMemorandumInterinatoSuspencion?: string;
  fchMemorandumInterinatoSuspencion?: Date | null;
  fchSuspencion?: Date | null;
  codigoSuspencion?: string;
  fchDesginacionSuspencion?: Date | null;
  MotivoSuspencion?: string;

  sayriInterinato?: string;
  abrv?: string;
  createdByInterinato?: number | null;
  modifiedByInterinato?: number | null;

  puestoActual?: Pick<Puesto, "idPuesto" | "itemPuesto" | "denominacionPuesto" | "departamento" | "personaActual" | 'estadoId'>;
  puestoNuevo?: Pick<Puesto, "idPuesto" | "itemPuesto" | "denominacionPuesto" | "departamento" | "personaActual" | 'estadoId'>;
  
  personaNuevo?: Pick<Persona, | "idPersona" | "primerApellidoPersona" | "segundoApellidoPersona" | "nombrePersona" | "ciPersona" | "generoPersona">;
  personaActual?: Pick<Persona, | "idPersona" | "primerApellidoPersona" | "segundoApellidoPersona" | "nombrePersona" | "ciPersona" | "generoPersona">;
  usuarioCreador?: Pick<User, "id" | "name" | "username">;
  usuarioModificador?: Pick<User, "id" | "name" | "username">;
}


