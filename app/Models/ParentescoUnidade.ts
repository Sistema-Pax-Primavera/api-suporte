import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class ParentescoUnidade extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.parentesco_unidade'

  // ID do parentesco.
  @column()
  public parentescoId: number

  // ID da unidade.
  @column()
  public unidadeId: number

  // Indica se o parentesco é um adicional.
  @column()
  public adicional: boolean

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
  public static async format(data: ParentescoUnidade){
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
  }
}