import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class MensagemMobile extends BaseModel {
  public static table = 'cobranca.mensagem_mobile'

  @column({ isPrimary: true })
  public id: number

  // ID do vendedor associado a mensagem.
  @column()
  public cobradorId: number

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
  public createdBy: string

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null | undefined

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null | undefined
}