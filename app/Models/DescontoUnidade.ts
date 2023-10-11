import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class DescontoUnidade extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.desconto_unidade'

  // ID do desconto.
  @column()
  public descontoId: number

  // ID da unidade.
  @column()
  public unidadeId: number

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
  * @param {DescontoUnidade} descontoUnidade - O objeto DescontoUnidade a ser formatado.
  *
  * @memberOf DescontoUnidade
  */
  @beforeSave()
  public static async formatFields(descontoUnidade: DescontoUnidade) {
    descontoUnidade.createdBy = formatarString(descontoUnidade.createdBy)
    descontoUnidade.updatedBy = formatarString(descontoUnidade.updatedBy)
  }
}
