import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Atendimento extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.atendimento'

  @column({ isPrimary: true })
  public id: number

  // ID do associado vinculado ao atendimento.
  @column()
  public associadoId: number

  // ID do tipo vinculado ao atendimento.
  @column()
  public tipoAtendimentoId: number | null | undefined

  // ID do sub-tipo vinculado ao atendimento.
  @column()
  public subTipoAtendimentoId: number | null | undefined

  // Data do contato com o associado.
  @column.date()
  public dataContato: DateTime | null | undefined

  // Data/Hora de retorno do contato com o associado.
  @column.dateTime()
  public dataRetorno: DateTime | null | undefined

  // Status do atendimento: 0-Pendente  1-Finalizado  2-Retorno.
  @column()
  public status: number

  // Data/Hora do início do atendimento.
  @column.dateTime()
  public inicioAtendimento: DateTime | null | undefined

  // Data/Hora do fim do atendimento.
  @column.dateTime()
  public fimAtendimento: DateTime | null | undefined

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

  @beforeSave()
  public static async format(data: Atendimento){
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}