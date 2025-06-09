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
  tipo: 'ESCOLA' | 'RESPONSAVEL' | 'ADMIN';
}

export interface ResponsavelRequest {
  nomeCompleto: string;
  cpf:          string;
  email:        string;
  senha:        string;
  roles:        string[];
  endereco:     string;
  telefone:     string;
}

export interface EscolaRequest {
  nomeCompleto: string;
  cpf:          string;
  email:        string;
  senha:        string;
  roles:        string[];
  matricula:    string;
}