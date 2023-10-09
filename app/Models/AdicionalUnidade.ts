import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarDecimal, formatarString } from 'App/Util/Format'
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
  public valorAdesao: string | number | null

  // Valor da mensalidade do adicional.
  @column()
  public valorMensalidade: string | number | null

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
  * @param {AdicionalUnidade} adicionalUnidade - O objeto AdicionalUnidade a ser formatado.
  *
  * @memberOf AdicionalUnidade
  */
  @beforeSave()
  public static async formatFields(adicionalUnidade: AdicionalUnidade) {
    adicionalUnidade.valorAdesao = formatarDecimal(adicionalUnidade.valorAdesao)
    adicionalUnidade.valorMensalidade = formatarDecimal(adicionalUnidade.valorMensalidade)
    adicionalUnidade.createdBy = formatarString(adicionalUnidade.createdBy)
    adicionalUnidade.updatedBy = formatarString(adicionalUnidade.updatedBy)
  }
}
