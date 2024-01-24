import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
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
  public valorAdesao: number

  // Valor da mensalidade do plano.
  @column()
  public valorMensalidade: number

  // Valor de emissão do cartão associado.
  @column()
  public valorCartao: number | null | undefined

  // Valor dos dependentes adicionais do plano.
  @column()
  public valorAdicional: number | null | undefined

  // Valor da transferência para este plano.
  @column()
  public valorTransferencia: number | null | undefined

  // Dias a cumprir de carência para contratos novos.
  @column()
  public carenciaNovo: number | null | undefined

  // Dias a cumprir de carência em caso de atraso.
  @column()
  public carenciaAtraso: number | null | undefined

  // Limite de dependentes no plano, caso seja "null" ou "0" não tem limite.
  @column()
  public limiteDependente: number | null | undefined

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