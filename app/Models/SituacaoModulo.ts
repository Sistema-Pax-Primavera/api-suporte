import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class SituacaoModulo extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.situacao_modulo'

  @column({ isPrimary: true })
  public id: number

  // ID da situação a ser liberada.
  @column()
  public situacaoId: number
  
  // ID do módulo a ser liberado.
  @column()
  public moduloId: number

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