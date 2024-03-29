import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Funcao extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'public.funcao'

  @column({ isPrimary: true })
  public id: number

  // Nome da função.
  @column()
  public descricao: string

  // Indica se o resgistro está ativo.
  @column()
  public ativo: boolean

  // Data de criação do registro.
  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  // Nome do criador do registro.
  @column({ serializeAs: null })
  public createdBy: string

  // Data de atualização do registro.
  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime | null | undefined

  // Nome do responsável pela atualização do registro.
  @column({ serializeAs: null })
  public updatedBy: string | null | undefined

  @beforeSave()
  public static async format(data: Funcao){
    data.descricao = data.descricao?.toUpperCase()
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}