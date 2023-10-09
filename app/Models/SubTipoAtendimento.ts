import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
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
  * @param {SubTipoAtendimento} subTipoAtendimento - O objeto SubTipoAtendimento a ser formatado.
  *
  * @memberOf SubTipoAtendimento
  */
  @beforeSave()
  public static async formatFields(subTipoAtendimento: SubTipoAtendimento) {
    subTipoAtendimento.descricao = formatarString(subTipoAtendimento.descricao)
    subTipoAtendimento.createdBy = formatarString(subTipoAtendimento.createdBy)
    subTipoAtendimento.updatedBy = formatarString(subTipoAtendimento.updatedBy)
  }
}
