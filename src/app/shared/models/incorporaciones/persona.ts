export interface Persona {
  idPersona: number;
  ciPersona?: string;
  expPersona?: string;
  primerApellidoPersona?: string;
  segundoApellidoPersona?: string;
  nombrePersona?: string;
  profesionPersona?: string;
  generoPersona?: string;
  fchNacimientoPersona?: string;
  telefonoPersona?: string | null;
  createdAt: string;
  updatedAt: string;
  fechaInicio: string | null;
  fechaFin: string | null;
}