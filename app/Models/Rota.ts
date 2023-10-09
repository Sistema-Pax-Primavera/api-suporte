import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Rota extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.rota'

  @column({ isPrimary: true })
  public id: number

  // ID da unidade vinculada a rota.
  @column()
  public unidadeId: number

  // ID do cobrador vinculado a rota.
  @column()
  public cobradorId: number

  // Nome do rota.
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
  * @param {Rota} rota - O objeto Rota a ser formatado.
  *
  * @memberOf Rota
  */
  @beforeSave()
  public static async formatFields(rota: Rota) {
    rota.descricao = formatarString(rota.descricao)
    rota.createdBy = formatarString(rota.createdBy)
    rota.updatedBy = formatarString(rota.updatedBy)
  }
}
