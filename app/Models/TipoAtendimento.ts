import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class TipoAtendimento extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.tipo_atendimento'

  @column({ isPrimary: true })
  public id: number

  // Nome do tipo de atendimento.
  @column()
  public descricao: string | null

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column()
  public createdBy: string | null

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null

  /**
  * Método de gancho (hook) que formata os campos do registro antes de salvá-los.
  *
  * @param {TipoAtendimento} tipoAtendimento - O objeto TipoAtendimento a ser formatado.
  *
  * @memberOf TipoAtendimento
  */
  @beforeSave()
  public static async formatFields(tipoAtendimento: TipoAtendimento) {
    tipoAtendimento.descricao = formatarString(tipoAtendimento.descricao)
    tipoAtendimento.createdBy = formatarString(tipoAtendimento.createdBy)
    tipoAtendimento.updatedBy = formatarString(tipoAtendimento.updatedBy)
  }
}
