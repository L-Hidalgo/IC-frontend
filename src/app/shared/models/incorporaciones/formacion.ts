import { AreaFormacion } from "./area-formacion";
import { GradoAcademico } from "./grado-academico";
import { Institucion } from "./institucion";

export interface Formacion {
  idFormacion: number;
  personaId: number;
  institucionId?: number;
  gradoAcademicoId?: number;
  areaFormacionId?: number;
  gestionFormacion?: string;
  estadoFormacion?: string;
  conRespaldoFormacion?: number;
  fechaInicio?: string; 
  fechaFin?: string;
  // relations
  areaFormacion?: AreaFormacion;
  gradoAcademico?: GradoAcademico;
  institucion?: Institucion;
}