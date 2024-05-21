
export interface Usuario {
    tipoUsuarioId?: number,
    tipoUsuarioDescripcion?: string,
    login?: string,
    usuarioId?: number,
}

export interface Persona {
    tipoDocumentoId?: number,
    tipoDocumento?: string,
    complemento?: string,
    primerApellido?: string,
    segundoApellido?: string,
    nombreCompleto?: string,
    nroDocumento?: string,
    personaId?: number,
    email?: string,
    nombres?: string,
}

export interface Contribuyente {
    nit?: number;
    razonSocial?: string,
    ifc?: number,
    dependenciaId?: number,
    dependencia?: string,
}

export interface Funcionario {
    oficinaId?: number,
    oficina?: string,
    dependenciaId?: number,
    dependencia?: string,
    cargo?: string,
    cargoId?: number,
}

export interface UserInfo {
    sub?: string;
    usuario?: Usuario;
    contribuyente?: Contribuyente;
    persona?: Persona;
    funcionario?: Funcionario;
    email_verified?: boolean;
    name?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
}

export interface Sesion {
    sessionId: string;
    accessToken: string;
    refreshToken: string;
    roles: number[];
    userInfo: UserInfo;
}

