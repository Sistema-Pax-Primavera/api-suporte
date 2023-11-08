import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Modulo extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.modulo'

  @column({ isPrimary: true })
  public id: number

  // Nome do módulo.
  @column()
  public descricao: string | null

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column({ serializeAs: null })
  public createdBy: string | null

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  // Nome do responsável pela atualização do registro.
  @column({ serializeAs: null })
  public updatedBy: string | null

  /**
  * Método de gancho (hook) que formata os campos do registro antes de salvá-los.
  *
  * @param {Modulo} modulo - O objeto Modulo a ser formatado.
  *
  * @memberOf Modulo
  */
  @beforeSave()
  public static async formatFields(modulo: Modulo) {
    modulo.descricao = formatarString(modulo.descricao)
    modulo.createdBy = formatarString(modulo.createdBy)
    modulo.updatedBy = formatarString(modulo.updatedBy)
  }
}
