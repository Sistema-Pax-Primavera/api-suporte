import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
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
  public valorPagar: number

  // Valor pago para unidade.
  @column()
  public valorPago: number | null | undefined

  // Porcentagem distribuída para unidade.
  @column()
  public porcentagem: number | null | undefined

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
  public createdBy: string

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime | null | undefined

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null | undefined

  @beforeSave()
  public static async format(data: UnidadeDevedora){
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}