import { Gerencia } from "./gerencia";

export interface Departamento {
    idDepartamento: number;
    nombreDepartamento?: string;
  
  // Relaciones
  gerencia?: Pick <Gerencia, 'idGerencia' | 'nombreGerencia'>; 
}
