import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Adicional extends BaseModel {
  // Definição do nome da tabela.
  public static table = 'cobranca.adicional'

  @column({ isPrimary: true })
  public id: number

  // Nome do adicional.
  @column()
  public descricao: string

  // Indica se o adicional é pet.
  @column()
  public pet: boolean

  // Porte do adicional.
  @column()
  public porte: string

  // Indica se vai possuir resgate de cinzas.
  @column()
  public resgate: boolean

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
  public static async format(data: Adicional){
    data.descricao = data.descricao?.toUpperCase()
    data.porte = data.porte?.toUpperCase()
    data.createdBy = data.createdBy?.toUpperCase()
    data.updatedBy = data.updatedBy?.toUpperCase()
    
  }
}