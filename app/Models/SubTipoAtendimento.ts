import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class SubTipoAtendimento extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.sub_tipo_atendimento'

  @column({ isPrimary: true })
  public id: number

  // ID do tipo de atendimento vinculado ao sub-tipo.
  @column()
  public tipoAtendimentoId: number

  // Nome do sub-tipo de atendimento.
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