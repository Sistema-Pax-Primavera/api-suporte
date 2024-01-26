import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import UnidadeDevedora from './UnidadeDevedora.js'

export default class TitularVenda extends BaseModel {
  public static table = 'venda.titular_venda'

  @column({ isPrimary: true })
  public id?: number

  // ID da unidade associada a este titular.
  @column()
  public unidadeId: number

  // Nome do titular.
  @column()
  public nome: string

  // RG do titular.
  @column()
  public rg: string

  // CPF ou CNPJ do titular.
  @column()
  public cpfCnpj: string | null | undefined

  // Data de nascimento do titular.
  @column.date()
  public dataNascimento: DateTime

  // Data de falecimento do titular.
  @column.date()
  public dataFalecimento: DateTime | null | undefined

  // Estado civil do titular.
  @column()
  public estadoCivilId: number | null | undefined

  // Religião do titular.
  @column()
  public religiaoId: number | null | undefined

  // Naturalidade do titular.
  @column()
  public naturalidade: string | null | undefined

  // Nacionalidade do titular (True - Brasileiro, False - Estrangeiro).
  @column()
  public nacionalidade: boolean | null | undefined

  // Profissão do titular.
  @column()
  public profissao: string | null | undefined

  // Gênero do titular (1 - Masculino, 2 - Feminino, 3 - Não Binário, 4 - Indefinido)
  @column()
  public sexo: number | null | undefined

  // Indica se o titular possui cremação.
  @column()
  public cremacao: boolean | null | undefined

  // Indica se o plano cumprirá carência.
  @column()
  public carencia: boolean | null | undefined

  // Indica se o titular pagará adesão.
  @column()
  public adesao: boolean | null | undefined

  // Número de contrato do plano.
  @column()
  public contrato: number | null | undefined

  // Telefone do titular.
  @column()
  public telefone1: string | null | undefined

  // Telefone secundário do titular.
  @column()
  public telefone2: string | null | undefined

  // Email do titular.
  @column()
  public email1: string | null | undefined

  // Email secundário do titular.
  @column()
  public email2: string | null | undefined

  // Indica se o endereço comercial é o mesmo do residencial.
  @column()
  public enderecoComercial: boolean | null | undefined

  // ID do município vinculado ao endereço residencial do titular.
  @column()
  public municipioId: number | null | UnidadeDevedora
 
  // ID do bairro vinculado ao endereço residencial do titular.
  @column()
  public bairroId: number | null | UnidadeDevedora
 
  // CEP do endereço residencial do titular.
  @column()
  public cep: string | null | undefined

  // Estado (UF) do endereço residencial do titular.
  @column()
  public estado: string | null | undefined

  // Rua do endereço residencial do titular.
  @column()
  public rua: string | null | undefined

  // Logradouro do endereço residencial do titular.
  @column()
  public logradouro: string | null | undefined

  // Quadra do endereço residencial do titular.
  @column()
  public quadra: string | null | undefined

  // Lote do endereço residencial do titular.
  @column()
  public lote: string | null | undefined

  // Número do endereço residencial do titular.
  @column()
  public numero: string | null | undefined

  // Complemento do endereço residencial do titular.
  @column()
  public complemento: string | null | undefined

  // ID do município vinculado ao endereço de cobrança do titular.
  @column()
  public municipioCobrancaId: number | null | undefined

  // ID do bairro vinculado ao endereço de cobrança do titular.
  @column()
  public bairroCobrancaId: number | null | undefined

  // CEP do endereço de cobrança do titular.
  @column()
  public cepCobranca: string | null | undefined

  // Estado (UF) do endereço de cobrança do titular.
  @column()
  public estadoCobranca: string | null | undefined

  // Rua do endereço de cobrança do titular.
  @column()
  public ruaCobranca: string | null | undefined

  // Logradouro do endereço de cobrança do titular.
  @column()
  public logradouroCobranca: string | null | undefined

  // Quadra do endereço de cobrança do titular.
  @column()
  public quadraCobranca: string | null | undefined

  // Lote do endereço de cobrança do titular.
  @column()
  public loteCobranca: string | null | undefined

  // Número do endereço de cobrança do titular.
  @column()
  public numeroCobranca: string | null | undefined

  // Complemento do endereço de cobrança do titular.
  @column()
  public complementoCobranca: string | null | undefined

  // ID do plano vinculado ao titular.
  @column()
  public planoId: number | null | undefined

  // Data da primeia parcela a ser paga.
  @column.date()
  public dataPrimeiraParcela: DateTime | null | undefined

  // Dia de vencimento das parcelas.
  @column()
  public diaPagamento: number | null | undefined

  // ID do vendedor associado ao plano.
  @column()
  public vendedorId: number | null | undefined

  // Data de cancelamento do plano.
  @column.date()
  public dataCancelamento: DateTime | null | undefined

  // Data de cadastro do plano anterior.
  @column.date()
  public dataContratoAnterior: DateTime | null | undefined

  // Último mês pago do plano anterior.
  @column.date()
  public ultimoMesPagoAnterior: DateTime | null | undefined

  // Empresa assistencial do plano anterior.
  @column()
  public empresaAnterior: string | null | undefined

  // Local de cobrança ideal (1 - Escritório, 2 - Boleto, 3 - Cobrança Residencial, 4 - Cobrança Comercial, 4 - Pagamento Recorrente).
  @column()
  public localCobranca: number

  // Horário de cobrança ideal.
  @column()
  public horarioCobranca: DateTime | null | undefined

  @column()
  public status: boolean

  // ID do template (TIPO) da venda.
  @column()
  public templateId: number | null | undefined

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column()
  public createdBy: string

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null | undefined

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null | undefined
}