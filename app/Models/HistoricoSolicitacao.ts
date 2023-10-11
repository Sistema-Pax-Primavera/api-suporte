import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { formatarString } from 'App/Util/Format'
import { DateTime } from 'luxon'

export default class HistoricoSolicitacao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'arquivo.historico_solicitacao'

  @column({ isPrimary: true })
  public id: number

  // ID da solicitação.
  @column()
  public solicitacaoId: number

  // Descrição do histórico.
  @column()
  public descricao: string | null

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
  * @param {HistoricoSolicitacao} historicoSolicitacao - O objeto HistoricoSolicitacao a ser formatado.
  *
  * @memberOf HistoricoSolicitacao
  */
  @beforeSave()
  public static async formatFields(historicoSolicitacao: HistoricoSolicitacao) {
    historicoSolicitacao.descricao = formatarString(historicoSolicitacao.descricao)
    historicoSolicitacao.createdBy = formatarString(historicoSolicitacao.createdBy)
    historicoSolicitacao.updatedBy = formatarString(historicoSolicitacao.updatedBy)
  }
}
