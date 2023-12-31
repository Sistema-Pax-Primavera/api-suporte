import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'

export default class MensagemMobileVenda extends BaseModel {
  public static table = 'venda.mensagem_mobile'

  @column({ isPrimary: true })
  public id: number

  // ID do vendedor associado a mensagem.
  @column()
  public vendedorId: number

  // Comando que será enviado ao app. O mesmo é criptografado.
  @column()
  public comando: string

  // Indica se a mensagem já foi enviada.
  @column()
  public enviado: boolean

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
 * @param {MensagemMobileVenda} mensagemMobileVenda - O objeto MensagemMobileVenda a ser formatado.
 *
 * @memberOf MensagemMobileVenda
 */
  @beforeSave()
  public static async formatFields(mensagemMobileVenda: MensagemMobileVenda) {
    mensagemMobileVenda.createdBy = formatarString(mensagemMobileVenda.createdBy)
    mensagemMobileVenda.updatedBy = formatarString(mensagemMobileVenda.updatedBy)
  }
}
