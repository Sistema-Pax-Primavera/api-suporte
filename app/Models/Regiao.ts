import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Regiao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.regiao'

  @column({ isPrimary: true })
  public id: number

  // ID da unidade vinculada a região.
  @column()
  public unidadeId: number

  // ID do cobrador vinculado a região.
  @column()
  public cobradorId: number

  // Nome do região.
  @column()
  public descricao: string

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