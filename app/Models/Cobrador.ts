import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Cobrador extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.cobrador'

  @column({ isPrimary: true })
  public id: number

  // ID do usuário.
  @column()
  public usuarioId: number

  // Nome do cobrador.
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
  * @param {Cobrador} cobrador - O objeto Cobrador a ser formatado.
  *
  * @memberOf Cobrador
  */
  @beforeSave()
  public static async formatFields(cobrador: Cobrador) {
    cobrador.descricao = formatarString(cobrador.descricao)
    cobrador.createdBy = formatarString(cobrador.createdBy)
    cobrador.updatedBy = formatarString(cobrador.updatedBy)
  }
}
