import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class UnidadeFinanceira extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'financeiro.unidade_financeira'

  @column({ isPrimary: true })
  public id: number

  // Nome da unidade.
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
  * @param {UnidadeFinanceira} unidadeFinanceira - O objeto UnidadeFinanceira a ser formatado.
  *
  * @memberOf UnidadeFinanceira
  */
  @beforeSave()
  public static async formatFields(unidadeFinanceira: UnidadeFinanceira) {
    unidadeFinanceira.descricao = formatarString(unidadeFinanceira.descricao)
    unidadeFinanceira.createdBy = formatarString(unidadeFinanceira.createdBy)
    unidadeFinanceira.updatedBy = formatarString(unidadeFinanceira.updatedBy)
  }
}
