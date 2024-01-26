import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Conta extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'financeiro.conta'

  @column({ isPrimary: true })
  public id: number

  // ID da unidade vinculada a conta.
  @column()
  public unidadeId: number | null | undefined

  // ID do banco vinculado a conta.
  @column()
  public bancoId: number | null | undefined

  // Nome da conta.
  @column()
  public descricao: string

  // Agência da conta.
  @column()
  public agencia: number | null | undefined

  // Dígito da agência da conta.
  @column()
  public digitoAgencia: number | null | undefined

  // Número da conta.
  @column()
  public conta: number | null | undefined

  // Dígito do número da conta.
  @column()
  public digitoConta: number | null | undefined

  // Tipo da conta bancária: 1-Poupança 2-Conta corrente.
  @column()
  public tipoContaBancaria: number | null | undefined

  // Tipo da conta: T-Tesouraria B-Bancario C-Cartão P-Provisória.
  @column()
  public tipo: string

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