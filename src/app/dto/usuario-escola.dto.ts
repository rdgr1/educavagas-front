export interface UsuarioEscolaDto {
  uuid?: string;
  nomeCompleto: string;
  cpf?: string;
  email: string;
  senha: string;
  roles: string[];
  matricula?: string;
}