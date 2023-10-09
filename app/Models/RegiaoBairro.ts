import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class RegiaoBairro extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.regiao_bairro'

  @column({ isPrimary: true })
  public id: number

  // Nome da região do bairro.
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
  * @param {RegiaoBairro} regiaoBairro - O objeto RegiaoBairro a ser formatado.
  *
  * @memberOf RegiaoBairro
  */
  @beforeSave()
  public static async formatFields(regiaoBairro: RegiaoBairro) {
    regiaoBairro.descricao = formatarString(regiaoBairro.descricao)
    regiaoBairro.createdBy = formatarString(regiaoBairro.createdBy)
    regiaoBairro.updatedBy = formatarString(regiaoBairro.updatedBy)
  }
}
