export interface UsuarioDto {
  uuid: string;
  nomeCompleto: string;
  cpf: string;
  email: string;
  senha: string;
  criadoEm: string;
  atualizadoEm: string;
  ultimoLogin?: string;
  roles: string[];
}