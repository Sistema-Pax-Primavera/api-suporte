import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarDecimal, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class AssociadoItem extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.associado_item'

  // ID do associado.
  @column()
  public associadoId: number

  // ID do item.
  @column()
  public itemId: number

  // Quantidade padrão liberada do item.
  @column()
  public quantidade: number

  // Valor da adesão do item.
  @column()
  public valorAdesao: number | null

  // Valor da mensalidade do item.
  @column()
  public valorMensalidade: number | null

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
  * @param {AssociadoItem} associadoItem - O objeto AssociadoItem a ser formatado.
  *
  * @memberOf AssociadoItem
  */
  @beforeSave()
  public static async formatFields(associadoItem: AssociadoItem) {
    associadoItem.valorAdesao = formatarDecimal(associadoItem.valorAdesao)
    associadoItem.valorMensalidade = formatarDecimal(associadoItem.valorMensalidade)
    associadoItem.createdBy = formatarString(associadoItem.createdBy)
    associadoItem.updatedBy = formatarString(associadoItem.updatedBy)
  }
}
