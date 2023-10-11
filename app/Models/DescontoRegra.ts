import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarDecimal, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class DescontoRegra extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.desconto_regra'

  @column({ isPrimary: true })
  public id: number

  // Tipo do desconto: 1-Atrasadas 2-Adiantadas.
  @column()
  public tipo: number

  // Quantidade de parcelas.
  @column()
  public quantidade: number

  // Operador para validação da regra.
  @column()
  public operador: string

  // Desconto a ser aplicado.
  @column()
  public desconto: number | null

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
  * @param {DescontoRegra} descontoRegra - O objeto DescontoRegra a ser formatado.
  *
  * @memberOf DescontoRegra
  */
  @beforeSave()
  public static async formatFields(descontoRegra: DescontoRegra) {
    descontoRegra.desconto = formatarDecimal(descontoRegra.desconto)
    descontoRegra.createdBy = formatarString(descontoRegra.createdBy)
    descontoRegra.updatedBy = formatarString(descontoRegra.updatedBy)
  }
}
