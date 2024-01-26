import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Bairro extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.bairro'

  @column({ isPrimary: true })
  public id: number

  // ID do município vinculado ao bairro.
  @column()
  public municipioId: number

  // ID da região vinculada ao bairro.
  @column()
  public regiaoBairroId: number | null | undefined

  // Nome do bairro.
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