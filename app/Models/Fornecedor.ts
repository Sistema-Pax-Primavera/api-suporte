import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Fornecedor extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'financeiro.fornecedor'

  @column({ isPrimary: true })
  public id: number

  // Nome do fornecedor.
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
  * @param {Fornecedor} fornecedor - O objeto Fornecedor a ser formatado.
  *
  * @memberOf Fornecedor
  */
  @beforeSave()
  public static async formatFields(fornecedor: Fornecedor) {
    fornecedor.descricao = formatarString(fornecedor.descricao)
    fornecedor.createdBy = formatarString(fornecedor.createdBy)
    fornecedor.updatedBy = formatarString(fornecedor.updatedBy)
  }
}
