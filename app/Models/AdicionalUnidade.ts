import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class AdicionalUnidade extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.adicional_unidade'

  // ID do adicional a ser liberado.
  @column()
  public adicionalId: number

  // ID da unidade a ser liberada.
  @column()
  public unidadeId: number

  // Valor de adesão do adicional.
  @column()
  public valorAdesao: number

  // Valor da mensalidade do adicional.
  @column()
  public valorMensalidade: number

  // Dias a cumprir de carência para contratos novos.
  @column()
  public carenciaNovo: number

  // Dias a cumprir de carência em caso de atraso.
  @column()
  public carenciaAtraso: number

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column()
  public createdBy: string | null | undefined

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Nome do responsável pela atualização do registro.
  @column()
  public updatedBy: string | null | undefined

  @beforeSave()
  public static async format(data: AdicionalUnidade){
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}