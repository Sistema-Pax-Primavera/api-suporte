import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarDecimal, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class UnidadeDevedora extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'financeiro.unidade_devedora'

  // ID da conta a pagar.
  @column()
  public contaPagarId: number

  // ID da unidade financeira.
  @column()
  public unidadeId: number

  // Valor a ser pago pela unidade.
  @column()
  public valorPagar: number | null

  // Valor pago para unidade.
  @column()
  public valorPago: number | null

  // Porcentagem distribuída para unidade.
  @column()
  public porcentagem: number | null

  // Status do repasse: 0-LOCAL 1-A ENVIAR 2-ENVIADA 3-ACEITA 4-REJEITADA 5-FALHA AO ENVIAR.
  @column()
  public status: number

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
  * @param {UnidadeDevedora} unidadeDevedora - O objeto UnidadeDevedora a ser formatado.
  *
  * @memberOf UnidadeDevedora
  */
  @beforeSave()
  public static async formatFields(unidadeDevedora: UnidadeDevedora) {
    unidadeDevedora.valorPagar = formatarDecimal(unidadeDevedora.valorPagar)
    unidadeDevedora.valorPago = formatarDecimal(unidadeDevedora.valorPago)
    unidadeDevedora.porcentagem = formatarDecimal(unidadeDevedora.porcentagem)
    unidadeDevedora.createdBy = formatarString(unidadeDevedora.createdBy)
    unidadeDevedora.updatedBy = formatarString(unidadeDevedora.updatedBy)
  }
}
