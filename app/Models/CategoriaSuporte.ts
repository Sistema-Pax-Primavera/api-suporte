import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class CategoriaSuporte extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.categoria_suporte'

  @column({ isPrimary: true })
  public id: number

  // Nome da categoria.
  @column()
  public descricao: string

  // Ordem de prioridade.
  @column()
  public prioridade: number

  // IDs dos setores liberados.
  @column()
  public setor: number[] | null | undefined

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
  public static async format(data: CategoriaSuporte){
    data.descricao = data.descricao?.toUpperCase()
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}