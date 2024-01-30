import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class AssociadoItem extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'associado.associado_item'

  // ID do associado.
  @column()
  public associadoId: number

  // ID do item.
  @column()
  public itemId: number

  // Quantidade padrão liberada do item.
  @column()
  public quantidade: number

  // Valor da adesão do item.
  @column()
  public valorAdesao: number

  // Valor da mensalidade do item.
  @column()
  public valorMensalidade: number

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
  public static async format(data: AssociadoItem){
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}