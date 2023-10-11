import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarDecimal, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class PlanoItem extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.plano_item'

  // ID do plano.
  @column()
  public planoId: number

  // ID do item.
  @column()
  public itemId: number

  // ID da unidade.
  @column()
  public unidadeId: number

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
  * @param {PlanoItem} planoItem - O objeto PlanoItem a ser formatado.
  *
  * @memberOf PlanoItem
  */
  @beforeSave()
  public static async formatFields(planoItem: PlanoItem) {
    planoItem.valorAdesao = formatarDecimal(planoItem.valorAdesao)
    planoItem.valorMensalidade = formatarDecimal(planoItem.valorMensalidade)
    planoItem.createdBy = formatarString(planoItem.createdBy)
    planoItem.updatedBy = formatarString(planoItem.updatedBy)
  }
}
