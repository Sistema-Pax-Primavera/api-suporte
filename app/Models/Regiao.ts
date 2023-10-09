import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class Regiao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.regiao'

  @column({ isPrimary: true })
  public id: number

  // ID da unidade vinculada a região.
  @column()
  public unidadeId: number

  // ID do cobrador vinculado a região.
  @column()
  public cobradorId: number

  // Nome do região.
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
  * @param {Regiao} regiao - O objeto Regiao a ser formatado.
  *
  * @memberOf Regiao
  */
  @beforeSave()
  public static async formatFields(regiao: Regiao) {
    regiao.descricao = formatarString(regiao.descricao)
    regiao.createdBy = formatarString(regiao.createdBy)
    regiao.updatedBy = formatarString(regiao.updatedBy)
  }
}
