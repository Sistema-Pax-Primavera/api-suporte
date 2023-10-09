import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class TipoCaixa extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.tipo_caixa'

  @column({ isPrimary: true })
  public id: number

  // Nome do tipo de caixa.
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
  * @param {TipoCaixa} tipoCaixa - O objeto TipoCaixa a ser formatado.
  *
  * @memberOf TipoCaixa
  */
  @beforeSave()
  public static async formatFields(tipoCaixa: TipoCaixa) {
    tipoCaixa.descricao = formatarString(tipoCaixa.descricao)
    tipoCaixa.createdBy = formatarString(tipoCaixa.createdBy)
    tipoCaixa.updatedBy = formatarString(tipoCaixa.updatedBy)
  }
}
