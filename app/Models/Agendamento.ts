import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Agendamento extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.agendamento'

  @column({ isPrimary: true })
  public id: number
  
  // ID do associado vinculado ao agendamento.
  @column()
  public associadoId: number

  // ID do cobrador vinculado ao agendamento.
  @column()
  public cobradorId: number | null | undefined

  // Indica o tipo do agendamento: 1-Cobrador  2-Atendimento.
  @column()
  public tipo: number

  // Status do agendamento: 0-Pendente  1-Finalizado.
  @column()
  public status: number

  // Data/Hora de retorno do agendamento.
  @column.dateTime()
  public retorno: DateTime | null | undefined

  // Motivo do agendamento.
  @column()
  public motivo: string

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
  public static async format(data: Agendamento){
    data.motivo = data.motivo?.toUpperCase()
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}