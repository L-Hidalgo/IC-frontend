import { AreaFormacion } from "./area-formacion";

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
}