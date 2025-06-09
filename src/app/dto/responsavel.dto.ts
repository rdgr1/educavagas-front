export interface ResponsavelDto {
  uuid?: string;
  nomeCompleto: string;
  cpf?: string;
  email: string;
  senha: string;
  roles: string[];
  telefone?: string;
  endereco?: string;
}