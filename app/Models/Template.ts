import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Template extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'venda.template'

  @column({ isPrimary: true })
  public id: number

  // Nome do template.
  @column()
  public descricao: string

  // HTML do template a ser renderizado.
  @column()
  public template: string

  // Tipo do template.
  @column()
  public tipo: number

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