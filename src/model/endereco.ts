export class Endereco {
  cep: string
  localidade: string
  uf: string
  bairro: string
  logradouro: string
  
  constructor(
    cep: string, 
    localidade: string,
    uf: string,
    bairro: string,
    logradouro: string
  ) {
    this.cep = cep
    this.localidade = localidade
    this.uf = uf
    this.bairro = bairro
    this.logradouro = logradouro
  } 
}