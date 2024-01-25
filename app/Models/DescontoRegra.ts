import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class DescontoRegra extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.desconto_regra'

  @column({ isPrimary: true })
  public id: number

  // Tipo do desconto: 1-Atrasadas 2-Adiantadas.
  @column()
  public tipo: number

  // Quantidade de parcelas.
  @column()
  public quantidade: number

  // Operador para validação da regra.
  @column()
  public operador: string

  // Desconto a ser aplicado.
  @column()
  public desconto: number

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