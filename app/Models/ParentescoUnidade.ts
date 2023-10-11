import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class ParentescoUnidade extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.parentesco_unidade'

  // ID do parentesco.
  @column()
  public parentescoId: number

  // ID da unidade.
  @column()
  public unidadeId: number

  // Indica se o parentesco é um adicional.
  @column()
  public adicional: boolean

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
  * @param {ParentescoUnidade} parentescoUnidade - O objeto ParentescoUnidade a ser formatado.
  *
  * @memberOf ParentescoUnidade
  */
  @beforeSave()
  public static async formatFields(parentescoUnidade: ParentescoUnidade) {
    parentescoUnidade.createdBy = formatarString(parentescoUnidade.createdBy)
    parentescoUnidade.updatedBy = formatarString(parentescoUnidade.updatedBy)
  }
}
