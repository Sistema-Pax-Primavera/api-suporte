import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
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
  public descricao: string

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
  public static async format(data: HistoricoSolicitacao){
    data.descricao = data.descricao?.toUpperCase()
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}