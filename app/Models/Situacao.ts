import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Situacao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.situacao'

  @column({ isPrimary: true })
  public id: number

  // Nome da situação.
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
  * @param {Situacao} situacao - O objeto Situacao a ser formatado.
  *
  * @memberOf Situacao
  */
  @beforeSave()
  public static async formatFields(situacao: Situacao) {
    situacao.descricao = formatarString(situacao.descricao)
    situacao.createdBy = formatarString(situacao.createdBy)
    situacao.updatedBy = formatarString(situacao.updatedBy)
  }
}
