import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Solicitacao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.solicitacao'

  @column({ isPrimary: true })
  public id: number

  // ID da categoria da solicitação.
  @column()
  public categoriaId: number

  // Conteúdo JSON da solicitação.
  @column()
  public conteudo: Object

  // ID do usuário que registrou a solicitação.
  @column()
  public usuarioId: number

  // Status da solicitação: 0-Pendente 1-Em atendimento 2-Cancelado 3-Finalizado.
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
  public static async format(data: Solicitacao){
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}