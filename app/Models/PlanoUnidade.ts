import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarDecimal, formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class PlanoUnidade extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.plano_unidade'

  // ID do plano a ser liberado.
  @column()
  public planoId: number

  // ID da unidade a ser liberada.
  @column()
  public unidadeId: number

  // Valor de adesão do plano.
  @column()
  public valorAdesao: string | number | null

  // Valor da mensalidade do plano.
  @column()
  public valorMensalidade: string | number | null

  // Valor de emissão do cartão associado.
  @column()
  public valorCartao: string | number | null

  // Valor dos dependentes adicionais do plano.
  @column()
  public valorAdicional: string | number | null

  // Valor da transferência para este plano.
  @column()
  public valorTransferencia: string | number | null

  // Dias a cumprir de carência para contratos novos.
  @column()
  public carenciaNovo: number

  // Dias a cumprir de carência em caso de atraso.
  @column()
  public carenciaAtraso: number

  // Limite de dependentes no plano, caso seja "null" não tem limite.
  @column()
  public limiteDependente: number

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
  * @param {PlanoUnidade} planoUnidade - O objeto PlanoUnidade a ser formatado.
  *
  * @memberOf PlanoUnidade
  */
  @beforeSave()
  public static async formatFields(planoUnidade: PlanoUnidade) {
    planoUnidade.valorAdesao = formatarDecimal(planoUnidade.valorAdesao)
    planoUnidade.valorMensalidade = formatarDecimal(planoUnidade.valorMensalidade)
    planoUnidade.valorCartao = formatarDecimal(planoUnidade.valorCartao)
    planoUnidade.valorAdicional = formatarDecimal(planoUnidade.valorAdicional)
    planoUnidade.valorTransferencia = formatarDecimal(planoUnidade.valorTransferencia)
    planoUnidade.createdBy = formatarString(planoUnidade.createdBy)
    planoUnidade.updatedBy = formatarString(planoUnidade.updatedBy)
  }
}
